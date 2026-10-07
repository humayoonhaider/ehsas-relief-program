import React, { useState, useEffect } from 'react';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  RotateCcw,
  Sliders,
  Check,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { FormField, FormFieldType, FormSection } from '../types';
import { settingsService } from '../services/settingsService';
import { authService } from '../services/authService';
import { DEFAULT_FORM_FIELDS } from '../utils/constants';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const FormBuilder: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>('ALL');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Field Form State
  const [fieldName, setFieldName] = useState('');
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldPlaceholder, setFieldPlaceholder] = useState('');
  const [fieldType, setFieldType] = useState<FormFieldType>('text');
  const [fieldSection, setFieldSection] = useState<FormSection>('personal');
  const [fieldRequired, setFieldRequired] = useState(false);
  const [fieldOptionsText, setFieldOptionsText] = useState('');
  const [fieldHint, setFieldHint] = useState('');
  const [modalError, setModalError] = useState<string | null>(null);

  const loadData = () => {
    setFields(settingsService.getFormFields());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const openAddModal = () => {
    setEditingField(null);
    setFieldName('');
    setFieldLabel('');
    setFieldPlaceholder('');
    setFieldType('text');
    setFieldSection('application');
    setFieldRequired(false);
    setFieldOptionsText('');
    setFieldHint('');
    setModalError(null);
    setModalOpen(true);
  };

  const openEditModal = (field: FormField) => {
    setEditingField(field);
    setFieldName(field.name);
    setFieldLabel(field.label);
    setFieldPlaceholder(field.placeholder || '');
    setFieldType(field.type);
    setFieldSection(field.section);
    setFieldRequired(field.required);
    setFieldOptionsText((field.options || []).join('\n'));
    setFieldHint(field.hint || '');
    setModalError(null);
    setModalOpen(true);
  };

  const handleSaveField = () => {
    if (!fieldLabel.trim()) {
      setModalError('Field Label is required');
      return;
    }

    const safeName =
      fieldName.trim() ||
      fieldLabel
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_');

    const optionsArray =
      ['select', 'radio', 'checkbox'].includes(fieldType) && fieldOptionsText.trim()
        ? fieldOptionsText
            .split('\n')
            .map((o) => o.trim())
            .filter(Boolean)
        : undefined;

    let updatedList = [...fields];

    if (editingField) {
      updatedList = updatedList.map((f) =>
        f.id === editingField.id
          ? {
              ...f,
              name: safeName,
              label: fieldLabel.trim(),
              placeholder: fieldPlaceholder.trim() || undefined,
              type: fieldType,
              section: fieldSection,
              required: fieldRequired,
              options: optionsArray,
              hint: fieldHint.trim() || undefined,
            }
          : f
      );
    } else {
      const newField: FormField = {
        id: 'cf-' + Math.random().toString(36).substring(2, 8),
        name: safeName,
        label: fieldLabel.trim(),
        placeholder: fieldPlaceholder.trim() || undefined,
        type: fieldType,
        section: fieldSection,
        required: fieldRequired,
        options: optionsArray,
        order: updatedList.length + 1,
        isActive: true,
        hint: fieldHint.trim() || undefined,
      };
      updatedList.push(newField);
    }

    if (currentUser) {
      settingsService.updateFormFields(updatedList, currentUser.email, currentUser.name);
    }
    setFields(updatedList);
    setModalOpen(false);
    showToast(editingField ? 'Field updated successfully' : 'New custom field added to schema');
  };

  const handleToggleActive = (id: string) => {
    const updated = fields.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f));
    if (currentUser) {
      settingsService.updateFormFields(updated, currentUser.email, currentUser.name);
    }
    setFields(updated);
    showToast('Field visibility updated');
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= fields.length) return;

    const newArr = [...fields];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    // re-assign order property
    newArr.forEach((f, idx) => {
      f.order = idx + 1;
    });

    if (currentUser) {
      settingsService.updateFormFields(newArr, currentUser.email, currentUser.name);
    }
    setFields(newArr);
  };

  const handleDeleteField = (id: string) => {
    const updated = fields.filter((f) => f.id !== id);
    if (currentUser) {
      settingsService.updateFormFields(updated, currentUser.email, currentUser.name);
    }
    setFields(updated);
    showToast('Field removed from schema');
  };

  const handleResetDefaults = () => {
    if (currentUser) {
      settingsService.updateFormFields(DEFAULT_FORM_FIELDS, currentUser.email, currentUser.name);
    }
    setFields(DEFAULT_FORM_FIELDS);
    setResetConfirmOpen(false);
    showToast('Form schema restored to default fields');
  };

  const filteredFields =
    activeSectionFilter === 'ALL'
      ? fields
      : fields.filter((f) => f.section === activeSectionFilter);

  return (
    <div>
      {/* Toast */}
      {successToast && (
        <div
          className="alert alert-success"
          style={{
            position: 'fixed',
            top: '80px',
            right: '24px',
            zIndex: 100,
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 200ms ease',
          }}
        >
          <CheckCircle size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-900)' }}>
            Dynamic Form Builder
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Configure fields, labels, requirements, and dynamic inputs rendered in the public applicant form.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="outline" size="sm" onClick={() => setResetConfirmOpen(true)} icon={<RotateCcw size={16} />}>
            Reset to Default
          </Button>

          <Button variant="primary" size="sm" onClick={openAddModal} icon={<Plus size={16} />}>
            Add New Field
          </Button>
        </div>
      </div>

      {/* Mode Tabs: Editor vs Live Preview */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('editor')}
          className={`btn ${activeTab === 'editor' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          <Sliders size={16} />
          <span>Schema Editor ({fields.length} Fields)</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`btn ${activeTab === 'preview' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          <Eye size={16} />
          <span>Live Form Preview Simulator</span>
        </button>
      </div>

      {activeTab === 'editor' && (
        <div>
          {/* Section Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {['ALL', 'personal', 'address', 'household', 'application'].map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSectionFilter(sec)}
                style={{
                  backgroundColor: activeSectionFilter === sec ? 'var(--primary-700)' : 'var(--surface)',
                  color: activeSectionFilter === sec ? '#ffffff' : 'var(--navy-700)',
                  border: '1px solid var(--border)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {sec === 'ALL' ? 'All Sections' : sec}
              </button>
            ))}
          </div>

          {/* Fields List */}
          <div className="form-builder-list">
            {filteredFields.map((field, index) => (
              <div
                key={field.id}
                className={`form-field-card ${!field.isActive ? 'is-inactive' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                  {/* Reorder Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button
                      onClick={() => handleMoveOrder(index, 'up')}
                      disabled={index === 0}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '2px', height: 'auto' }}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(index, 'down')}
                      disabled={index === fields.length - 1}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '2px', height: 'auto' }}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <div className="field-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="field-name">{field.label}</span>
                      {field.required && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 700 }}>
                          * REQUIRED
                        </span>
                      )}
                    </div>

                    <div className="field-meta">
                      <span>Variable: <code>{field.name}</code></span>
                      <span>•</span>
                      <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>{field.type}</span>
                      <span>•</span>
                      <span style={{ textTransform: 'capitalize' }}>Section: {field.section}</span>
                      {field.options && (
                        <>
                          <span>•</span>
                          <span>{field.options.length} options</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleToggleActive(field.id)}
                    className="btn btn-ghost btn-sm"
                    title={field.isActive ? 'Active in Form (Click to Hide)' : 'Inactive (Click to Enable)'}
                    style={{
                      color: field.isActive ? 'var(--primary-700)' : 'var(--navy-400)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {field.isActive ? 'Active' : 'Hidden'}
                  </button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(field)}
                    className="btn-icon"
                    title="Edit Field"
                  >
                    <Edit2 size={16} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteField(field.id)}
                    className="btn-icon"
                    style={{ color: 'var(--danger)' }}
                    title="Delete Field"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIVE PREVIEW SIMULATOR */}
      {activeTab === 'preview' && (
        <div className="card" style={{ padding: '2rem', maxWidth: '720px', margin: '0 auto' }}>
          <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
            <Eye size={18} className="alert-icon" />
            <div className="alert-content">
              <strong>Applicant View Simulation</strong>
              <p style={{ margin: 0, fontSize: '0.8125rem' }}>
                This live preview reflects how your active fields render to citizens on the public <code>/apply</code> page.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {['personal', 'address', 'household', 'application'].map((sectionKey) => {
              const activeSecFields = fields.filter((f) => f.isActive && f.section === sectionKey);
              if (activeSecFields.length === 0) return null;

              return (
                <div key={sectionKey} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
                  <h4 style={{ textTransform: 'capitalize', fontSize: '1.05rem', color: 'var(--navy-900)', marginBottom: '1rem' }}>
                    {sectionKey} Information
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {activeSecFields.map((f) => (
                      <div key={f.id} className="form-group">
                        <label className="form-label">
                          {f.label}
                          {f.required && <span className="required-star">*</span>}
                        </label>
                        {f.type === 'textarea' ? (
                          <textarea className="form-textarea" placeholder={f.placeholder} disabled />
                        ) : f.type === 'select' ? (
                          <select className="form-select" disabled>
                            <option>{f.placeholder || 'Select...'}</option>
                            {f.options?.map((opt, i) => (
                              <option key={i}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={f.type}
                            className="form-control"
                            placeholder={f.placeholder}
                            disabled
                          />
                        )}
                        {f.hint && <span className="form-hint">{f.hint}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Field Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingField ? 'Edit Field' : 'Add New Form Field'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveField}>
              Save Field
            </Button>
          </>
        }
      >
        {modalError && (
          <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
            <AlertCircle size={16} />
            <span>{modalError}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            label="Field Label (Public Title)"
            placeholder="e.g. Monthly Electricity Expense"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
            required
          />

          <div className="form-grid-2">
            <Select
              label="Field Type"
              options={[
                { label: 'Text Input', value: 'text' },
                { label: 'Number Input', value: 'number' },
                { label: 'Email Address', value: 'email' },
                { label: 'Phone Number', value: 'phone' },
                { label: 'Date Picker', value: 'date' },
                { label: 'Dropdown Select', value: 'select' },
                { label: 'Radio Options', value: 'radio' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Multi-line Textarea', value: 'textarea' },
              ]}
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value as FormFieldType)}
              required
            />

            <Select
              label="Form Section"
              options={[
                { label: 'Personal Information', value: 'personal' },
                { label: 'Residential Address', value: 'address' },
                { label: 'Household & Financial', value: 'household' },
                { label: 'Application Details', value: 'application' },
              ]}
              value={fieldSection}
              onChange={(e) => setFieldSection(e.target.value as FormSection)}
              required
            />
          </div>

          <Input
            label="Placeholder Text"
            placeholder="e.g. Enter amount in USD"
            value={fieldPlaceholder}
            onChange={(e) => setFieldPlaceholder(e.target.value)}
          />

          <Input
            label="Helper / Hint Text"
            placeholder="e.g. Provide average of past 3 months"
            value={fieldHint}
            onChange={(e) => setFieldHint(e.target.value)}
          />

          {['select', 'radio', 'checkbox'].includes(fieldType) && (
            <Textarea
              rows={3}
              label="Options List (One option per line)"
              placeholder="Option 1&#10;Option 2&#10;Option 3"
              value={fieldOptionsText}
              onChange={(e) => setFieldOptionsText(e.target.value)}
            />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9375rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={fieldRequired}
                onChange={(e) => setFieldRequired(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <span>Mark this field as mandatory / required</span>
            </label>
          </div>
        </div>
      </Modal>

      {/* Reset Schema Confirmation */}
      <ConfirmDialog
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        onConfirm={handleResetDefaults}
        title="Reset Form Schema to Defaults?"
        message="This will overwrite custom fields and restore the standard 20 citizen grant application questions."
        confirmText="Reset Schema"
        variant="primary"
      />
    </div>
  );
};
