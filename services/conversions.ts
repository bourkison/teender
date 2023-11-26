import {Database} from '@/types/schema';

export const convertProductToSave = (
    product: Database['public']['Views']['v_products']['Row'],
    save: Database['public']['Tables']['saves']['Row'],
): Database['public']['Views']['v_saves']['Row'] => ({
    brand: product.brand,
    brand_id: product.brand_id,
    collection_id: null,
    collection_name: null,
    colors: product.colors,
    created_at: new Date().toString(),
    deleted: false,
    description: product.description,
    gender: product.gender,
    id: save.id,
    images: product.images,
    in_stock: product.in_stock,
    link: product.link,
    name: product.name,
    partner: product.partner,
    partner_id: product.partner_id,
    price: product.price,
    product_id: product.id,
    product_type: product.product_type,
    sale_price: product.sale_price,
    saved: true,
    updated_at: new Date().toString(),
    user_id: save.user_id,
    vendor_product_id: product.vendor_product_id,
});

export const convertProductToDelete = (
    product: Database['public']['Views']['v_products']['Row'],
    del: Database['public']['Tables']['deletes']['Row'],
): Database['public']['Views']['v_deletes']['Row'] => ({
    brand: product.brand,
    brand_id: product.brand_id,
    colors: product.colors,
    created_at: new Date().toString(),
    deleted: false,
    description: product.description,
    gender: product.gender,
    id: del.id,
    images: product.images,
    in_stock: product.in_stock,
    link: product.link,
    name: product.name,
    partner: product.partner,
    partner_id: product.partner_id,
    price: product.price,
    product_id: product.id,
    product_type: product.product_type,
    sale_price: product.sale_price,
    saved: true,
    updated_at: new Date().toString(),
    user_id: del.user_id,
    vendor_product_id: product.vendor_product_id,
});

export const convertDeleteToProduct = (
    del: Database['public']['Views']['v_deletes']['Row'],
): Database['public']['Views']['v_products']['Row'] => ({
    brand: del.brand,
    brand_id: del.brand_id,
    colors: del.colors,
    created_at: new Date().toString(),
    deleted: true,
    gender: del.gender,
    id: del.id,
    images: del.images,
    in_stock: del.in_stock,
    link: del.link,
    name: del.name,
    price: del.price,
    sale_price: del.sale_price,
    saved: false,
    updated_at: new Date().toString(),
    vendor_product_id: del.vendor_product_id,
    description: del.description,
    product_type: del.product_type,
    partner_id: del.partner_id,
    partner: del.partner,
});
