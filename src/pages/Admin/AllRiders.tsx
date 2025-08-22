import { useGetAllRidersQuery } from "@/redux/features/Admin/admin.api";

const AllRiders = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, isLoading, isError } = useGetAllRidersQuery(undefined)

    console.log(data);
    return (
        <div>
            <h1>All Riders</h1>
        </div>
    );
};

export default AllRiders;