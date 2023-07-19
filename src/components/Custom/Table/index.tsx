import { useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Col, Row, Spinner, Table as RSTable, Form, Pagination } from "react-bootstrap";
import NoData from "~/assets/svg/NoData";
import { TableObject } from "~/types";
import useQueryParams from "~/hooks/useQueryParams";

// head: [{ name, sortable, width, center }]
const Table = ({
  head,
  body,
  searchable,
  asyncSearchable,
  emptyMessage = "Gösterilecek veri bulunmamaktadır.",
  loading = false,
  pagination,
  children,
}: TableObject) => {
  const [sorting, setSorting]: any = useState("");
  const [search, setSearch] = useQueryParams("search");
  const [pageSize, setPageSize] = useQueryParams("pageSize");
  const [page, setPage] = useQueryParams("page");

  const filteredData = asyncSearchable
    ? body
    : body
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

  // PAGINATION
  let isPageNumberOutOfRange = false;
  const pageNumbers = ({ totalPages, currentPage, showingPage = 3 }: any) =>
    [...new Array(totalPages)].map((_, index) => {
      const pageNumber = index + 1;
      const isPageNumberFirst = pageNumber === 1;
      const isPageNumberLast = pageNumber === totalPages;
      const isCurrentPageWithinTwoPageNumbers =
        Math.abs(totalPages - currentPage) >= showingPage
          ? currentPage > showingPage
            ? Math.abs(pageNumber - currentPage) <= 1
            : Math.abs(pageNumber) <= showingPage + 1
          : Math.abs(pageNumber) >= totalPages - showingPage;

      if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
        isPageNumberOutOfRange = false;
        return (
          <Pagination.Item linkClassName="shadow-none" key={pageNumber} onClick={() => setPage(pageNumber)} active={pageNumber == currentPage}>
            {pageNumber}
          </Pagination.Item>
        );
      }

      if (!isPageNumberOutOfRange) {
        isPageNumberOutOfRange = true;
        return <Pagination.Ellipsis className="bg-transparent border-0 shadow-none" key={pageNumber} disabled />;
      }

      return null;
    });

  const paginateItems = (currentPage: any, totalPages: any, pageCount = 3) => {
    currentPage = Math.max(1, Math.min(currentPage, totalPages));
    const items = [];
    const startIdx = currentPage === 1 ? 1 : totalPages - currentPage < pageCount ? totalPages - pageCount : currentPage - 1;
    const endIdx = currentPage === totalPages ? totalPages : currentPage - pageCount < 0 ? pageCount + 1 : currentPage + 1;

    items.push(1);

    for (let i = 2; i <= totalPages - 1; i++) {
      if (startIdx <= i && i <= endIdx) {
        items.push(i);
      } else {
        items.push(undefined);
      }
    }

    items.push(totalPages);

    return items;
  };

  console.log(paginateItems(1, 10));

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
      {asyncSearchable && (
        <Row className="justify-content-between mb-3 g-3">
          {children}
          <Col xs="12" md="6" lg="3" className="ms-auto">
            <Form.Control value={search} onChange={(e: any) => setSearch(e.target.value)} type="search" placeholder="Arama" className="shadow-none" />
          </Col>
        </Row>
      )}

      {!filteredData || filteredData?.length === 0 ? (
        <div className="mt-5 d-flex flex-column align-items-center gap-3 text-center text-orange">
          <Col xs="6" md="4" lg="3">
            <NoData size="100%" color="var(--custom-color-100)" />
          </Col>
          <h6>{emptyMessage}</h6>
        </div>
      ) : (
        <>
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
              {loading ? (
                <tr>
                  <td colSpan={"100%" as any}>
                    <div className="text-center text-orange my-5">
                      <Spinner>loading...</Spinner>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData &&
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
                ))
              )}
            </tbody>
          </RSTable>
          {pagination && (
            <div className="d-flex align-items-center justify-content-between flex-column-reverse flex-lg-row gap-3 mt-3">
              <div className="d-flex align-items-center gap-2">
                <small className="flex-shrink-0">Kayıt Sayısı</small>
                <Form.Select size="sm" id="pageCount" className="shadow-none py-2" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Form.Select>
              </div>
              <Pagination>
                <Pagination.Prev
                  linkClassName="shadow-none"
                  disabled={(page || pagination?.currentPage) == 1}
                  onClick={() => setPage(+(page || pagination?.currentPage) - 1)}
                />
                {pageNumbers({ totalPages: pagination?.totalPages, currentPage: +(page || pagination?.currentPage) })}
                <Pagination.Next
                  linkClassName="shadow-none"
                  disabled={(page || pagination?.currentPage) == pagination?.totalPages}
                  onClick={() => setPage(+(page || pagination?.currentPage) + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Table;
