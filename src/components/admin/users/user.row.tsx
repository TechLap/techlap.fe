import dayjs from "dayjs";
import "dayjs/locale/vi";
import { IUser } from "../../../types/backend";
import Access from "../../../pages/auth/route/access";
import Edit from "../../common/icons/edit";
import Delete from "../../common/icons/delete";

interface IProps {
  userData?: IUser;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

dayjs.locale("vi");

const UserRow = (props: IProps) => {
  const { userData, onEditClick, onDeleteClick } = props;

  return (
    <tr>
      <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-black-800">
        {userData?.fullName}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {userData?.email}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {userData?.role?.name}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {userData?.phone}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {userData?.address}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-black-800">
        {userData?.createdAt ? dayjs.unix(Number(userData?.createdAt)).format("DD/MM/YYYY") : ""}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-end">
        <Access permission={{name: "Update a user"}} hideChildren>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
          onClick={onEditClick}
        >
          <Edit size={16} className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:bg-blue-100 rounded-lg"/>
        </button>
        </Access>

        <Access permission={{name: "Delete a user"}} hideChildren>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 px-1 rounded-lg border border-transparent text-gray-800 hover:text-gray-900 hover:bg-gray-50 focus:outline-hidden focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
          onClick={onDeleteClick}
        > 
          <Delete size={16} className="text-red-600 hover:text-red-800 hover:bg-red-100 focus:bg-red-100 rounded-lg"/>
        </button>
        </Access>
      </td>
    </tr>
  );
};

export default UserRow;
