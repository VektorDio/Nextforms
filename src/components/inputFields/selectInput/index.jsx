import React from 'react';
import styles from "./select.module.css";
import Select from "react-select";

const SelectInput = (props) => {
    return (
        <Select {...props} classNames={{
            container: () =>
                styles.container,
            control: () =>
                styles.control,
            menu: () =>
                styles.menu,
            option: () =>
                styles.option,
            selectContainer: () =>
                styles.control,
            placeholder: () =>
                styles.placeholder,
            singleValue: () =>
                styles.singleValue,
        }}
                menuPosition={"fixed"}
        />
    );
};

export default SelectInput;