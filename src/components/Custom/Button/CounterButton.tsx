import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";

const CounterButton = ({ quantity, setQuantity, min = 0, max = 99 }: any) => {
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (+count !== quantity) {
        setQuantity(count);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <Form.Group className="d-flex">
      <Button onClick={() => count > min && setCount(+count - 1)} className="d-flex align-items-center justify-content-center rounded-end-0">
        <FaMinus size="12" />
      </Button>
      <div className="text-center py-2 px-3" style={{ minWidth: "50px" }}>
        {count}
      </div>
      <Button onClick={() => count < max && setCount(+count + 1)} className="d-flex align-items-center justify-content-center rounded-start-0">
        <FaPlus size="12" />
      </Button>
    </Form.Group>
  );
};

export default CounterButton;
