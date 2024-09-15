import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Product } from '../types';

interface Props {
  product: Product;
  onSave: (product: Product) => void;
}

const productSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .max(30, 'Name cannot be more than 30 characters'),
  description: yup
    .string()
    .max(200, 'Description cannot be more than 200 characters'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be greater than zero'),
});

const ProductDetails: React.FC<Props> = ({ product, onSave }) => {
  return (
    <div className='rounded-xl bg-gray-200 flex flex-col items-center p-5'>
      <img
        className='w-24 h-24'
        src={`https://picsum.photos/100/100?random=${product.id}`}
      />
      <Formik
        initialValues={product}
        enableReinitialize
        validationSchema={productSchema}
        validateOnChange={true}
        validateOnBlur={true}
        isInitialValid={false}
        onSubmit={(values, { setSubmitting }) => {
          onSave(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className='w-full'>
            <div>
              <label className='block'>Name:</label>
              <Field name='name' className='input w-2/3' />
              <ErrorMessage
                name='name'
                component='div'
                className='text-red-500'
              />
            </div>
            <div>
              <label className='block'>Description:</label>
              <Field name='description' className='input w-2/3' as='textarea' />
              <ErrorMessage
                name='description'
                component='div'
                className='text-red-500'
              />
            </div>
            <div>
              <label className='block'>Price:</label>
              <div className='flex items-center'>
                <Field name='price' type='number' className='input w-14 mr-1' />
                $
              </div>
              <ErrorMessage
                name='price'
                component='div'
                className='text-red-500'
              />
            </div>
            <div className='flex justify-end mt-5'>
              <button
                type='submit'
                className='bg-sky-500 text-black text-lg rounded-xl px-8 py-3'
                disabled={isSubmitting||!isValid}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductDetails;
