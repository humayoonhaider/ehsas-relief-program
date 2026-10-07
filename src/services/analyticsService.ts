import { ApplicationStatus } from '../types';
import { storageService } from './storageService';

export interface AnalyticsMetrics {
  totalApplications: number;
  statusCounts: Record<ApplicationStatus, number>;
  totalSharesInitiated: number;
  sharesByPlacement: Record<string, number>;
  sharesPerApplicationRate: number;
  recentApplicationsCount: number; // last 7 days
  dailySubmissions: { date: string; count: number }[];
  incomeBreakdown: { bracket: string; count: number }[];
  provinceBreakdown: { province: string; count: number }[];
  housingBreakdown: { housing: string; count: number }[];
}

export const analyticsService = {
  getMetrics(): AnalyticsMetrics {
    const apps = storageService.getApplications();
    const shares = storageService.getShareInteractions();

    const statusCounts: Record<ApplicationStatus, number> = {
      SUBMITTED: 0,
      UNDER_REVIEW: 0,
      ADDITIONAL_INFO_REQUIRED: 0,
      APPROVED: 0,
      REJECTED: 0,
      COMPLETED: 0,
    };

    const provinceMap: Record<string, number> = {};
    const housingMap: Record<string, number> = {};
    const dateMap: Record<string, number> = {};

    let incomeUnder250 = 0;
    let income250to500 = 0;
    let income500to1000 = 0;
    let incomeOver1000 = 0;

    const sevenDaysAgo = Date.now() - 7 * 86400000;
    let recentAppsCount = 0;

    apps.forEach((app) => {
      // Status
      if (statusCounts[app.currentStatus] !== undefined) {
        statusCounts[app.currentStatus]++;
      }

      // Date breakdown
      if (app.submissionDate) {
        const d = new Date(app.submissionDate).toISOString().split('T')[0];
        dateMap[d] = (dateMap[d] || 0) + 1;

        if (new Date(app.submissionDate).getTime() >= sevenDaysAgo) {
          recentAppsCount++;
        }
      }

      // Province
      const prov = app.addressInfo?.province || 'Unspecified';
      provinceMap[prov] = (provinceMap[prov] || 0) + 1;

      // Housing
      const house = app.householdInfo?.housingStatus || 'Unspecified';
      housingMap[house] = (housingMap[house] || 0) + 1;

      // Income brackets
      const inc = Number(app.householdInfo?.monthlyIncome) || 0;
      if (inc < 250) incomeUnder250++;
      else if (inc <= 500) income250to500++;
      else if (inc <= 1000) income500to1000++;
      else incomeOver1000++;
    });

    // Shares by placement
    const sharesByPlacement: Record<string, number> = {};
    shares.forEach((s) => {
      const p = s.placement || 'general';
      sharesByPlacement[p] = (sharesByPlacement[p] || 0) + 1;
    });

    // Daily submissions sorted by date
    const dailySubmissions = Object.keys(dateMap)
      .sort()
      .map((date) => ({ date, count: dateMap[date] }));

    // Income breakdown
    const incomeBreakdown = [
      { bracket: '< $250 / mo', count: incomeUnder250 },
      { bracket: '$250 – $500 / mo', count: income250to500 },
      { bracket: '$501 – $1,000 / mo', count: income500to1000 },
      { bracket: '> $1,000 / mo', count: incomeOver1000 },
    ].filter((b) => b.count > 0 || apps.length > 0);

    // Province breakdown
    const provinceBreakdown = Object.keys(provinceMap).map((province) => ({
      province,
      count: provinceMap[province],
    }));

    // Housing breakdown
    const housingBreakdown = Object.keys(housingMap).map((housing) => ({
      housing,
      count: housingMap[housing],
    }));

    const totalApplications = apps.length;
    const totalSharesInitiated = shares.length;
    const sharesPerApplicationRate =
      totalApplications > 0
        ? parseFloat(((totalSharesInitiated / totalApplications) * 100).toFixed(1))
        : 0;

    return {
      totalApplications,
      statusCounts,
      totalSharesInitiated,
      sharesByPlacement,
      sharesPerApplicationRate,
      recentApplicationsCount: recentAppsCount,
      dailySubmissions,
      incomeBreakdown,
      provinceBreakdown,
      housingBreakdown,
    };
  },
};
