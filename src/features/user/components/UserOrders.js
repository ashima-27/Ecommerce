import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from '../userSlice';
import { Grid } from 'react-loader-spinner';

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  return (
    <div>
      {orders && orders?.map((order) => (
        <div key={order.id}>
          <div>
            <div className="px-4 mx-auto mt-12 bg-white max-w-7xl sm:px-6 lg:px-8">
              <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                <h1 className="my-5 text-4xl font-bold tracking-tight text-gray-900">
                  Order # {order.id}
                </h1>
                <h3 className="my-5 text-xl font-bold tracking-tight text-red-900">
                  Order Status : {order?.status}
                </h3>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                          <img
                            src={item.product?.thumbnail}
                            alt={item.product?.title}
                            className="object-cover object-center w-full h-full"
                          />
                        </div>

                        <div className="flex flex-col flex-1 ml-4">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.id}>{item.product.title}</a>
                              </h3>
                              <p className="ml-4">${item.product?.discountPercentage}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product?.brand}
                            </p>
                          </div>
                          <div className="flex items-end justify-between flex-1 text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty :{item.quantity}
                              </label>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{order.totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address :
                </p>
                <div className="flex justify-between px-5 py-5 border-2 border-gray-200 border-solid gap-x-6">
                  <div className="flex gap-x-4">
                    <div className="flex-auto min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress?.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {order.selectedAddress?.street}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {order.selectedAddress?.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectedAddress?.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectedAddress?.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
       {status === 'loading' ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
    </div>
  );
}