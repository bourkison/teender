import {PostgrestFilterBuilder} from '@supabase/postgrest-js';

import {Gender} from '@/types';
import {Database} from '@/types/schema';

type VProductsFilterBuilder = PostgrestFilterBuilder<
    Database['public'],
    Database['public']['Views']['v_products']['Row'],
    any
>;

type Filters = {
    gender: Gender;
    category: string[];
    color: string[];
    searchText: string;
    excludeSaved?: boolean;
    excludeDeleted?: boolean;
};

export function applyProductFilters(
    query: VProductsFilterBuilder,
    filters: Filters,
): VProductsFilterBuilder {
    if (filters.searchText) {
        query = query.textSearch(
            'name',
            `${filters.searchText.toLowerCase()}`,
            {
                type: 'websearch',
            },
        );
    }

    if (filters.category) {
        query = query.in('category', filters.category);
    }

    if (filters.gender !== 'both') {
        query = query.eq('gender', filters.gender);
    }

    if (filters.excludeSaved) {
        query = query.eq('saved', filters.excludeSaved);
    }

    if (filters.excludeDeleted) {
        query = query.eq('deleted', filters.excludeDeleted);
    }

    return query;
}
