import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCat, setFilterStatus, setSearchFilter } from "../../redux/features/categoryFilterSlice";

const SideChats = () => {
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme);
    const  searchFilter  = useSelector((state) => state.filterCategory.searchFilter);
  
    const categories = [
        "Hepsi",
        "Genel",
        "Kargo",
        "İade",
        "Şikayet",
    ]
    const handleInputChange = (event) => {
        dispatch(setSearchFilter(event.target.value.toLowerCase()));
    };

    return (
        <div className={`${theme ? "text-white " : " text-gray-600"} lg:px-6 space-y-4  font-semibold w-full`}>
            <div className="flex items-center border border-[#7269EF] gap-2 p-2 rounded-md">
                <CiSearch className="" size={22} />
                <input
                    className="bg-transparent outline-none text-sm  w-full "
                    onChange={handleInputChange}
                    type="text"
                    value={searchFilter}
                    placeholder="Mesaj veya kullanıcı arayın..." />
            </div>
        </div>
    )
}

export default SideChats