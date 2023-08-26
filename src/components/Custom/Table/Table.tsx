import React, { useState } from "react";
import { FaCheck, FaPen, FaPlus, FaSort, FaSortDown, FaSortUp, FaTrash, FaXmark } from "react-icons/fa6";
import { Col, Row, Spinner, Table as RSTable, Form, Pagination, Button } from "react-bootstrap";
import NoData from "~/components/Custom/NoData";
import { TableObject } from "~/types";
import useQueryParams from "~/hooks/useQueryParams";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";

const styles = {
  input: (base: any) => ({
    ...base,
    color: "var(--bs-body-color)",
    padding: "0.75px 0",
    margin: "0",
  }),
  control: (base: any, { isFocused }: any) => ({
    ...base,
    color: "var(--bs-body-color)",
    backgroundColor: "var(--bs-body-bg)",
    // minHeight: 45.38,
    // fontSize: "14px",
    border: isFocused ? "var(--bs-border-width) solid var(--bs-primary) !important" : "none",
    "&:hover": {
      borderColor: "var(--bs-border-color)",
    },
    borderRadius: "none",
    boxShadow: "none",
    height: "100%",
  }),
  container: (base: any) => ({
    ...base,
    height: "100%",
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0.5rem",
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 99,
    // fontSize: "14px",
    color: "var(--bs-body-color)",
    backgroundColor: "var(--bs-body-bg)",
    border: "var(--bs-border-width) solid var(--bs-border-color)",
  }),
  option: (base: any, { isDisabled, isFocused, isSelected }: any) => {
    return {
      ...base,
      backgroundColor: isDisabled ? "" : isSelected ? "var(--bs-primary)" : isFocused ? "var(--bs-primary)" : undefined,
      color: isDisabled ? "#ccc" : isSelected ? "#fff" : isFocused ? "#fff" : undefined,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...base[":active"],
        backgroundColor: !isDisabled ? (isSelected ? undefined : "var(--bs-primary)") : undefined,
        color: "#fff",
      },
    };
  },
  singleValue: (base: any) => ({
    ...base,
    color: "var(--bs-body-color)",
  }),
  multiValue: (base: any) => {
    return {
      ...base,
      backgroundColor: "transparent",
    };
  },
  multiValueLabel: (base: any) => ({
    ...base,
    color: "white",
    backgroundColor: "var(--bs-primary)",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "white",
    backgroundColor: "var(--bs-primary)",
    ":hover": {
      backgroundColor: "var(--bs-primary)",
    },
  }),
  // indicatorSeparator: (base) => ({
  //   ...base,
  //   backgroundColor: "var(--bs-border-color)",
  // }),
  // clearIndicator: (base) => ({
  //   ...base,
  //   color: "var(--bs-border-color)",
  // }),
  // dropdownIndicator: (base) => ({
  //   ...base,
  //   color: "var(--bs-border-color)",
  // })
};

// head: [{ name, key, sortable, width, center }]
const Table = ({
  head,
  body = [],
  searchable,
  asyncSearchable,
  emptyMessage = "Gösterilecek veri bulunmamaktadır.",
  loading = false,
  pagination,
  paginationCount = false,
  inlineEditable = false,
  creatable,
  editable,
  deletable,
  children,
}: TableObject) => {
  const [sorting, setSorting]: any = useState("");
  const [search, setSearch] = useQueryParams("search");
  const [pageSize, setPageSize] = useQueryParams("pageSize");
  const [page, setPage] = useQueryParams("page");

  const { register, handleSubmit, control, reset, watch } = useForm();

  const tableKey = watch("key");

  const filteredData = asyncSearchable
    ? body
    : [...body]
        ?.filter((items: any) =>
          Object.values(items).some(
            (item: any) =>
              !React.isValidElement(item) && (item?.value ?? item)?.toString().toLocaleLowerCase("TR").includes(search.toLocaleLowerCase("TR"))
          )
        )
        ?.sort((x: any, y: any) => {
          const a = x[head?.[sorting?.key]?.key]?.value ?? x[head?.[sorting?.key]?.key];
          const b = y[head?.[sorting?.key]?.key]?.value ?? y[head?.[sorting?.key]?.key];
          if (sorting?.orderBy === "asc") {
            return a?.toString().localeCompare(b, undefined, { numeric: true });
          }
          if (sorting?.orderBy === "desc") {
            return b?.toString().localeCompare(a, undefined, { numeric: true });
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

  const submitForm = (values: any) => {
    if (values?.key === body.length) {
      creatable?.(values);
    } else {
      editable?.(values);
    }
    reset((i: any) => ({ ...i, key: null }));
  };

  // console.log(watch());

  return (
    <>
      {creatable && (
        <Row className="justify-content-between mb-3 g-3">
          {children}
          <Col xs="12" md="6" lg="3" className="ms-auto text-end">
            <Button onClick={() => reset(head.reduce((x: any, y: any) => ({ ...x, [y?.key]: "" }), { key: body.length }))}>Ekle</Button>
          </Col>
        </Row>
      )}
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

      {filteredData?.length === 0 ? (
        <div className="mt-5 d-flex flex-column align-items-center gap-3 text-center text-primary">
          <Col xs="6" md="4" lg="3">
            <NoData size="100%" color="#624BFF" />
          </Col>
          <h5>{emptyMessage}</h5>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(submitForm)}>
            <RSTable responsive size="sm" className="text-nowrap">
              <thead>
                <tr>
                  {head?.map((value: any, key: any) => (
                    // @ts-ignore
                    <th width={value?.width} key={key}>
                      <div
                        className={"d-flex align-items-center gap-2 user-select-none" + (value?.center ? " justify-content-center" : "")}
                        onClick={() => {
                          if (sorting?.key === key) {
                            setSorting({ key, orderBy: sorting.orderBy === "asc" ? "desc" : sorting.orderBy === "desc" ? "" : "asc" });
                          } else {
                            setSorting({ key, orderBy: "asc" });
                          }
                          tableKey >= 0 && reset((i: any) => ({ ...i, key: null }));
                        }}
                      >
                        {value?.name}
                        {value?.sortable && (
                          <span className="d-flex">
                            {sorting?.key === key ? (
                              sorting?.orderBy === "desc" ? (
                                <FaSortUp className="text-primary" />
                              ) : sorting?.orderBy === "asc" ? (
                                <FaSortDown className="text-primary" />
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
                  {/* @ts-ignore */}
                  {editable && <th width={1}></th>}
                  {/* @ts-ignore */}
                  {(deletable || tableKey) && <th width={1}></th>}
                </tr>
              </thead>
              <tbody className="align-middle position-relative">
                {loading ? (
                  <tr>
                    <td colSpan={"100%" as any} className="border-0">
                      <div className="text-center text-primary my-5">
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredData?.map((data: any, key: number) => (
                      <tr
                        key={key}
                        onDoubleClick={() => {
                          if (inlineEditable) {
                            // setEditValue({ key, value: data });

                            reset({ ...data, key });
                            // reset({
                            //   ...Object.fromEntries(Object.entries(data).map(([key, value]: any) => [key, value?.label ?? value?.value ?? value])),
                            //   key,
                            // });
                          }
                        }}
                      >
                        {head?.map((item: any, index: number) => (
                          <td
                            className={classNames({
                              "text-center": item?.center,
                              "position-relative customTd": editable && tableKey === key, // editValue?.key === key,
                            })}
                            key={index}
                          >
                            {editable && tableKey === key ? (
                              item?.type === "select" ? (
                                <Input.ReactSelect
                                  name={item?.key}
                                  options={item?.options}
                                  control={control}
                                  register={register}
                                  menuPosition="fixed"
                                  classNameContainer="position-absolute top-0 bottom-0 w-100"
                                  baseStyles={styles}
                                  isClearable={false}
                                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                              ) : (
                                <input className="position-absolute form-control-plaintext top-0 bottom-0 px-2 z-1" {...register(item?.key)} />
                              )
                            ) : (
                              data?.[item?.key]?.label ?? data?.[item?.key]?.value ?? data?.[item?.key]
                            )}
                          </td>
                        ))}
                        {editable &&
                          (tableKey === key ? (
                            <>
                              <td>
                                <button
                                  type="submit"
                                  className="d-inline-flex align-items-center justify-content-center p-2 cursor-pointer text-success bg-transparent border-0"
                                >
                                  <FaCheck size="20" />
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="d-inline-flex align-items-center justify-content-center p-2 cursor-pointer text-danger bg-transparent border-0"
                                  onClick={() => reset((i: any) => ({ ...i, key: null }))}
                                >
                                  <FaXmark size="20" />
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              {!deletable && tableKey && <td></td>}
                              <td>
                                <button
                                  type="button"
                                  className="d-inline-flex align-items-center justify-content-center p-2 cursor-pointer text-primary bg-transparent border-0"
                                  onClick={() => (inlineEditable ? reset({ ...data, key }) : editable(data))}
                                >
                                  <FaPen size="20" />
                                </button>
                              </td>
                            </>
                          ))}
                        {deletable && tableKey !== key && (
                          <td>
                            <button
                              type="button"
                              className="d-inline-flex align-items-center justify-content-center p-2 cursor-pointer text-danger bg-transparent border-0"
                              onClick={() => deletable(data)}
                            >
                              <FaTrash size="20" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                    {creatable && tableKey == body.length && (
                      <tr>
                        {head?.map((item: any, index: number) => (
                          <td
                            className={classNames("position-relative customTd", {
                              "text-center": item?.center,
                            })}
                            key={index}
                          >
                            {item?.type === "select" ? (
                              <Input.ReactSelect
                                name={item?.key}
                                options={item?.options}
                                control={control}
                                register={register}
                                menuPosition="fixed"
                                classNameContainer="position-absolute top-0 bottom-0 w-100"
                                baseStyles={styles}
                                isClearable={false}
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                              />
                            ) : (
                              <>
                                <input className="position-absolute form-control-plaintext top-0 bottom-0 px-2 z-1" {...register(item?.key)} />
                              </>
                            )}
                          </td>
                        ))}
                        <td className="text-end">
                          <button
                            type="submit"
                            className="d-inline-flex align-items-center justify-content-center p-2 cursor-pointer text-success bg-transparent border-0"
                          >
                            <FaPlus size="20" />
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="d-inline-flex align-items-center justify-content-center p-2 cursor-pointer text-danger bg-transparent border-0"
                            onClick={() => reset((i: any) => ({ ...i, key: null }))}
                          >
                            <FaTrash size="20" />
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </RSTable>
          </form>
          {pagination && (
            <div className="d-flex align-items-center justify-content-between flex-column-reverse flex-lg-row gap-3 mt-3">
              {paginationCount && (
                <div className="d-flex align-items-center gap-2">
                  <small className="flex-shrink-0">Kayıt Sayısı</small>
                  <Form.Select size="sm" id="pageCount" className="shadow-none py-2" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Form.Select>
                </div>
              )}
              <Pagination className="ms-lg-auto">
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
