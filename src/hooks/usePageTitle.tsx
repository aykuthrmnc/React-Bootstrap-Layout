import { useEffect, useState } from "react";
import { changePageTitle } from "~/store/layout";
import useRedux from "./useRedux";

const usePageTitle = (value: {
  title: string;
  breadCrumbItems: {
    label: string;
    path: string;
    active?: boolean;
  }[];
}) => {
  const { dispatch } = useRedux();

  const [pageTitle] = useState(value);

  useEffect(() => {
    // set page title
    dispatch(changePageTitle(pageTitle));
  }, [dispatch, pageTitle]);
};
export default usePageTitle;
