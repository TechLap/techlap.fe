import { Plus } from "lucide-react";

interface IProps {
    onClick: () => void;
    title: string;
}

const CreateModalButton = (props: IProps) => {
    const { onClick, title } = props;
    return (
        <button
            type="button"
            className="py-2.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            onClick={onClick}
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            {title}
          </button>
    )
};

export default CreateModalButton;