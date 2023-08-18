import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct,updateProduct,fetchAllProducts ,fetchBrands,fetchCategories,fetchProductsByFilters, fetchProductById} from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems:0,
  brands:[],
  categories:[],
 selectedProduct:null,
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
  
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
  
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
  
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
  
    return response.data;
  }
);

export const fetchCategoryAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
  
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
      builder.addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems= action.payload.totalItems;
      });
      builder.addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
        
      });
      builder.addCase(fetchCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
        
      });
      builder.addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
        
      });
      builder
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;

      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectProductListStatus = (state) => state.product.status;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems=(state)=>state.product.totalItems;
export const selectBrands=(state)=>state.product.brands;
export const selectCategory=(state)=>state.product.categories;
export const selectedProductById=(state)=>state.product.selectedProduct;
export default productSlice.reducer;
