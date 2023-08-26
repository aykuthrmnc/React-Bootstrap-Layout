import Table from "~/components/Custom/Table/Table";
import { dateFormatter } from "~/utils/functions";

const TablePage = () => {
  const data = [
    { id: 1, name: "A", age: 26, gender: "E", date: "2023-06-13" },
    { id: 2, name: "B", age: 30, gender: "K", date: "2022-06-13" },
    { id: 3, name: "C", age: 15, gender: "E", date: "2023-03-13" },
    { id: 4, name: "D", age: 42, gender: "E", date: "2023-06-19" },
    { id: 5, name: "E", age: 63, gender: "K", date: "2023-06-03" },
  ];

  const genderData = [
    { value: 1, label: "Erkek" },
    { value: 2, label: "Kız" },
    { value: 3, label: "Bilinmiyor" },
  ];

  return (
    <Table
      head={[
        { name: "Ad", key: "name", sortable: true },
        { name: "Yaş", key: "age", sortable: true },
        { name: "Cinsiyet", key: "gender", options: genderData, type: "select", sortable: true },
        { name: "Tarih", key: "date", sortable: true },
      ]}
      body={data.map((item: any) => ({
        ...item,
        gender: {
          label: item?.gender == "E" ? "Erkek" : "Kız",
          value: item?.gender,
        },
        date: {
          label: dateFormatter(item?.date), // moment(item?.date).format("DD.MM.YYYY"),
          value: item?.date,
        },
      }))}
      // loading={gorevler.isLoading}
      creatable={(e) => console.log(e)}
      editable={(e) => console.log(e)}
      deletable={(e) => console.log(e)}
      inlineEditable
    />
  );
};
export default TablePage;
