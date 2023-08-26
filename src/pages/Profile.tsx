import { Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import Table from "~/components/Custom/Table/OldTable";
import { dateFormatter } from "~/utils/functions";

const Profile = () => {
  const data = [
    { id: 1, name: "A", age: 26, gender: "E", date: "2023-06-13" },
    { id: 2, name: "B", age: 30, gender: "K", date: "2023-06-13" },
    { id: 3, name: "C", age: 15, gender: "E", date: "2023-06-13" },
    { id: 4, name: "D", age: 42, gender: "E", date: "2023-06-13" },
    { id: 5, name: "E", age: 63, gender: "K", date: "2023-06-13" },
  ];

  return (
    <Card>
      <Card.Body>
        <Table
          head={[
            { name: "ID", sortable: true },
            { name: "Ad", sortable: true },
            { name: "Yaş", sortable: true },
            { name: "Cinsiyet", sortable: true },
            { name: "Tarih", sortable: true },
            { name: "Düzenle", sortable: true, center: true },
          ]}
          body={data.map((item: any) => [
            { value: item.id, type: "string" },
            { value: item.name, type: "string" },
            { value: item.age, type: "string" },
            { value: item.gender, type: "string" },
            { value: item.date, type: "string", displayValue: dateFormatter(item.date) },

            <div className="text-center">
              <span className="d-inline-flex align-items-center justify-content-center p-2 cursor-pointer">
                <FaEdit size="20" />
              </span>
            </div>,
          ])}
          loading={false}
          searchable
          pagination={{
            currentPage: 5,
            totalCount: 205,
            totalPages: 10,
            pageSize: 20,
          }}
        />
      </Card.Body>
    </Card>
  );
};
export default Profile;
