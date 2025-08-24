import dayjs from "dayjs";
import "dayjs/locale/vi";
import { IProduct } from "../../../types/backend";
import { NumericFormat } from "react-number-format";
import Access from "../../../pages/auth/route/access";

interface IProps {
  productData?: IProduct;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onViewClick: () => void;
}

dayjs.locale("vi");

const ProductRow = (props: IProps) => {
  const { productData, onEditClick, onDeleteClick, onViewClick } = props;

  return (
    <tr>
      <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-black-800">
        {productData?.name}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {productData?.category?.name}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {productData?.supplier?.name}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {productData?.quantity}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {productData?.unit}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        <NumericFormat
          value={productData?.price}
          displayType="text"
          allowLeadingZeros
          thousandSeparator={true}
          suffix={"đ"}
        />
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-end">
        <Access permission={{ name: "View a product" }} hideChildren>
          <button
            type="button"
            className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:text-gray-400 dark:focus:text-gray-400"
            onClick={onViewClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-3.5 text-blue-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </Access>
        <Access permission={{ name: "Update a product" }} hideChildren>
          <button
            type="button"
            className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:text-gray-400 dark:focus:text-gray-400"
            onClick={onEditClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-3.5 text-green-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </Access>
        <Access permission={{ name: "Delete a product" }} hideChildren>
          <button
            type="button"
            className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:hover:text-gray-400 dark:focus:text-gray-400"
            onClick={onDeleteClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-3.5 text-red-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </Access>
      </td>
    </tr>
  );
};

export default ProductRow;
