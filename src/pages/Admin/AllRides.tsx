import { useGetAllRidesQuery } from "@/redux/features/Admin/admin.api";


const AllRides = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, isLoading, isError } = useGetAllRidesQuery(undefined)

    console.log(data);
    return (
        <div>
            <h1>All Rides</h1>
        </div>
    );
};

export default AllRides;