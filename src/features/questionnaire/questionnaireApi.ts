import { createApi } from '@reduxjs/toolkit/query/react';

import fetchClient from '../../utils/httpClientHandler';
import type {
  FetchQuestionsParams,
  QuestionnaireData,
} from './questionnaire.types';

// A custom fetchBaseQuery for using fetchClient
const customBaseQuery = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body?: unknown;
}) => {
  try {
    const result = await fetchClient(url, { method, body });
    return { data: result };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: {
          status: 'ERROR',
          data: error.message || 'Error occurred',
        },
      };
    }
    return {
      error: { status: 'ERRPR', data: 'An unknown error occurred' },
    };
  }
};

// Define RTK Query API
export const questionnaireApi = createApi({
  reducerPath: 'questionnaireApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    fetchQuestionnaire: builder.query<QuestionnaireData, FetchQuestionsParams>({
      query: (params) => ({
        url: `/${params.category}`,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useLazyFetchQuestionnaireQuery } = questionnaireApi;
