import Dropdown from "react-bootstrap/Dropdown";

const CustomDropDown = ({ onSelect, title, items, selectedItem }) => {
  return (
    <Dropdown
      className="d-inline mx-2 "
      autoClose="outside"
      onSelect={onSelect}
      // align="end"
    >
      <Dropdown.Toggle
        id="dropdown-autoclose-outside"
        variant="light"
        className="fw-semibold p-3 "
      >
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item) => (
          <Dropdown.Item
            eventKey={item}
            className={`${
              selectedItem === item ? "active-class" : ""
            } fw-semibold`}
            key={item}
          >
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropDown;
