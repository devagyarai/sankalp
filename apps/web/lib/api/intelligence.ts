import { apiClient } from './client';
import { UnifiedOverview, IntelligenceOutputSchema } from '@/types/intelligence';

export const intelligenceApi = {
    getOverview: async (): Promise<UnifiedOverview> => {
        return apiClient.get<UnifiedOverview>('/intelligence/overview');
    },

    getFocus: async (): Promise<IntelligenceOutputSchema> => {
        return apiClient.get<IntelligenceOutputSchema>('/intelligence/focus');
    },

    getTrajectory: async (): Promise<IntelligenceOutputSchema> => {
        return apiClient.get<IntelligenceOutputSchema>('/intelligence/trajectory');
    },

    getPulse: async (): Promise<IntelligenceOutputSchema> => {
        return apiClient.get<IntelligenceOutputSchema>('/intelligence/pulse');
    },

    getShield: async (): Promise<IntelligenceOutputSchema> => {
        return apiClient.get<IntelligenceOutputSchema>('/intelligence/shield');
    },
};
