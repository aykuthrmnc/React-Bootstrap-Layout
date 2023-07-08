import { Table } from "react-bootstrap";

const TableMobile = ({ head, body }: any) => {
  return (
    <Table>
      {body?.map((items: any, key: any) => (
        <tbody key={key} className="border-bottom border-2 mb-4">
          {items?.map((item: any, index: number) =>
            Array.isArray(item) ? (
              <tr>
                <td>{head[index].name}</td>
                <td className="text-end">{item}</td>
              </tr>
            ) : (
              <tr>
                <td>{head[index].name}</td>
                <td className="text-end">{item}</td>
              </tr>
            )
          )}
        </tbody>
      ))}
    </Table>
  );
};

export default TableMobile;
