import { useGetAllDriverQuery } from "@/redux/features/Admin/admin.api";

const AllDrivers = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, isLoading, isError } =  useGetAllDriverQuery(undefined)

    console.log(data);

    return (
        <div>
            <h1>All Drivers</h1>
        </div>
    );
};

export default AllDrivers;