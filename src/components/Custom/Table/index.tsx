import { useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Col, Row, Spinner, Table as RSTable, Form } from "react-bootstrap";
import NoData from "~/assets/svg/NoData";
import { TableObject } from "~/types";

// head: [{ name, sortable, width, center }]
const Table = ({ head, body, searchable, emptyMessage = "Gösterilecek veri bulunmamaktadır.", loading = false, children }: TableObject) => {
  const [sorting, setSorting]: any = useState("");
  const [search, setSearch]: any = useState("");

  const filteredData =
    body &&
    body
      ?.filter((items: any) =>
        items?.some(
          (item: any) => typeof item?.value === "string" && item?.value.toString().toLocaleLowerCase("TR").includes(search.toLocaleLowerCase("TR"))
        )
      )
      ?.sort((a: any, b: any) => {
        if (sorting?.orderBy === "asc") {
          return a[sorting?.key]?.value.toString().localeCompare(b[sorting?.key]?.value, undefined, { numeric: true });
        }
        if (sorting?.orderBy === "desc") {
          return b[sorting?.key]?.value.toString().localeCompare(a[sorting?.key]?.value, undefined, { numeric: true });
        }
        return 1;
      });

  if (loading) {
    return (
      <div className="text-center text-orange my-5">
        <Spinner>Yükleniyor...</Spinner>
      </div>
    );
  }

  if (!body || body?.length === 0) {
    return (
      <Row className="mb-3 g-3">
        {children}
        <div className="mt-5 d-flex flex-column align-items-center gap-3 text-center text-orange">
          <Col xs="6" md="4" lg="3">
            <NoData size="100%" color="var(--orange-color-100)" />
          </Col>
          <h6>{emptyMessage}</h6>
        </div>
      </Row>
    );
  }

  return (
    <>
      {searchable && (
        <Row className="justify-content-between mb-3 g-3">
          {children}
          <Col xs="12" md="6" lg="3" className="ms-auto">
            <Form.Control value={search} onChange={(e: any) => setSearch(e.target.value)} type="search" placeholder="Arama" className="shadow-none" />
          </Col>
        </Row>
      )}

      <RSTable hover responsive size="sm" className="text-nowrap">
        <thead>
          <tr>
            {head &&
              head?.map((value: any, key: any) => (
                // @ts-ignore
                <th width={value?.width} key={key}>
                  <div className={"d-flex align-items-center gap-2" + (value?.center ? " justify-content-center" : "")}>
                    {value?.name}
                    {value?.sortable && (
                      <span
                        className="text-orange d-flex cursor-pointer"
                        onClick={() => {
                          if (sorting?.key === key) {
                            setSorting({ key, orderBy: sorting.orderBy === "asc" ? "desc" : sorting.orderBy === "desc" ? "" : "asc" });
                          } else {
                            setSorting({ key, orderBy: "asc" });
                          }
                        }}
                      >
                        {sorting?.key === key ? (
                          sorting?.orderBy === "desc" ? (
                            <FaSortUp />
                          ) : sorting?.orderBy === "asc" ? (
                            <FaSortDown />
                          ) : (
                            <FaSort />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="align-middle position-relative">
          {filteredData &&
            filteredData?.map((items: any, key: any) => (
              <tr key={key}>
                {items?.map((item: any, index: number) => (
                  // <td key={index}>
                  //   {item?.type === "date" && (item?.value ? dateFormatter(item?.value) : "-")}
                  //   {item?.type === "currency" && (item?.value ? currencyFormatter.format(item?.value) : "-")}
                  //   {item?.type === "string" && item?.value}
                  //   {React.isValidElement(item) && item}
                  //   {/* {item?.type === "date" ? (item?.value ? dateFormatter(item?.value) : "-") : item?.type === "currency" ? currencyFormatter.format(item?.value) : item?.value || item} */}
                  // </td>
                  <td className={item?.center && "text-center"} key={index}>
                    {item?.displayValue ?? item?.value ?? item}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </RSTable>
    </>
  );
};

export default Table;
