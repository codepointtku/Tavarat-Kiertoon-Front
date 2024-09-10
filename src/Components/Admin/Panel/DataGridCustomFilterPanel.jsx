import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Stack,
    FormControl,
    InputLabel,
    NativeSelect,
    Paper,
    Grid,
    IconButton,
    TextField,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, useWatch, useFieldArray, Controller } from 'react-hook-form';

function FilterRow({ len, setOpen, control, columns, index, handleRemoveFilter, localizedTextsMap, onSubmit }) {
    const filtercolumnwatch = useWatch({ control, name: `filterForm.${index}.column` });
    const columnsOptions = columns.filter((value) => value.valueOptions);
    const column = columnsOptions.filter((value) => value.field === filtercolumnwatch);

    return (
        <Grid container spacing={0}>
            <Grid
                item
                md={2}
                style={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    size="small"
                    onClick={() => {
                        handleRemoveFilter(index);
                        if (len === 1) {
                            onSubmit({ filterForm: {} });
                            setOpen(false);
                        }
                        handleRemoveFilter(index);
                    }}
                >
                    <CloseIcon style={{ fontSize: '20px' }} />
                </IconButton>
                {index > 0 ? (
                    <Controller
                        name={`filterForm.${index}.andor`}
                        control={control}
                        defaultValue="and"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormControl variant="standard" sx={{ width: '100%' }}>
                                <NativeSelect id="filterandor" onChange={onChange} value={value}>
                                    <option key={0} value="and">
                                        {localizedTextsMap.filterPanelOperatorAnd}
                                    </option>
                                    {/* <option key={1} value="or">
                                        {localizedTextsMap.filterPanelOperatorOr}
                                    </option> */}
                                </NativeSelect>
                            </FormControl>
                        )}
                    />
                ) : null}
            </Grid>

            <Grid item md={3}>
                <Controller
                    name={`filterForm.${index}.column`}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel focused={true}>Sarake</InputLabel>
                            <NativeSelect value={value} onChange={onChange}>
                                {columns.map((a, index) => {
                                    return a.filterable === false ? null : (
                                        <option key={index} value={a.field}>
                                            {a.headerName}
                                        </option>
                                    );
                                })}
                            </NativeSelect>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item md={3}>
                <Controller
                    name={`filterForm.${index}.filter`}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel>Suodatin</InputLabel>

                            <NativeSelect value={value} onChange={onChange}>
                                {columns
                                    .filter((value) => value.field === filtercolumnwatch)[0]
                                    .filterOperators.map((a, index) => {
                                        return (
                                            <option key={index} value={a.value}>
                                                {
                                                    localizedTextsMap[
                                                        `filterOperator${a.value
                                                            .charAt(0)
                                                            .toUpperCase()}${a.value.slice(1)}`
                                                    ]
                                                }
                                            </option>
                                        );
                                    })}
                            </NativeSelect>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item md={4}>
                <Controller
                    name={`filterForm.${index}.value`}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            {column.length > 0 ? (
                                <>
                                    <InputLabel shrink={true}>Arvo</InputLabel>
                                    <NativeSelect value={value} onChange={onChange}>
                                        <option key="-1" value=""></option>
                                        {column[0].valueOptions?.map((val, index) => {
                                            return (
                                                <option key={index} value={val.value}>
                                                    {val.label}
                                                </option>
                                            );
                                        })}
                                    </NativeSelect>
                                </>
                            ) : (
                                <TextField onChange={onChange} value={value} label="Arvo" variant="standard" />
                            )}
                        </FormControl>
                    )}
                />
                {/* )} */}
            </Grid>
        </Grid>
    );
}

const DataGridCustomFilter = ({ columns, localizedTextsMap, onSubmit, setFilterItems, filterItems }) => {
    const { control, handleSubmit, getValues } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'filterForm',
    });
    const [open, setOpen] = useState(false);
    const removeField = (id) => {
        //if all rows are removed submit empty form to fetch all orders/users/products
        if (fields.length <= 1) {
            onSubmit({ filterForm: [] });
        }
        console.log(fields);
        remove(id);
    };
    let filterableColumns = columns.slice();
    useEffect(() => {
        if (filterItems.length === 0 && fields.length === 0) {
            append({
                column: columns[0].field,
                filter: 'contains',
                value: '',
            });
        } else if (fields.length === 0) {
            filterItems.map((items) => {
                append({
                    column: items.field,
                    filter: items.operator,
                    value: items.value,
                });
                return null;
            });
        }
    }, [fields]);

    const [clickedOutside, setClickedOutside] = useState(false);

    const myRef = useRef();

    const handleClickOutside = (e) => {
        if (myRef.current && !myRef.current.contains(e.target)) {
            setClickedOutside(true);
            setOpen(!open);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });
    const addNewFilter = () => {
        filterableColumns = filterableColumns.filter(
            (el) => !fields.find((rm) => rm.column === el.field) && el.filterable !== false
        );
        console.log(filterableColumns);
        append({
            column: filterableColumns[0].field,
            filter: 'contains',
            value: '',
        });
    };
    const resetFilter = () => {
        setFilterItems([]);

        onSubmit({ filterForm: [] });
    };

    return (
        <>
            <Button
                startIcon={<FilterListIcon />}
                size="small"
                onClick={() => {
                    setOpen(!open);
                }}
                // disabled={isDisabled}
            >
                {localizedTextsMap.toolbarFilters}
            </Button>
            {open ? (
                <div ref={myRef}>
                    <Paper
                        style={{
                            width: 550,
                            padding: 10,
                            zIndex: 1300,
                            position: 'absolute',
                            inset: '0px auto auto 0px',
                            margin: 0,
                            display: 'block',
                            // transform: "translate3d(160.556px, 252.222px, 0px)",
                        }}
                        variant="elevation"
                        elevation={5}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={0.5}>
                                <div>
                                    {fields.map((field, index) => {
                                        return (
                                            <div key={index} style={{ paddingBottom: 5 }}>
                                                <FilterRow
                                                    len={fields.length}
                                                    fields={fields}
                                                    control={control}
                                                    setOpen={setOpen}
                                                    field={field}
                                                    columns={filterableColumns}
                                                    handleRemoveFilter={() => removeField(index)}
                                                    onSubmit={onSubmit}
                                                    getValues={getValues}
                                                    localizedTextsMap={localizedTextsMap}
                                                    {...{ control, index, field }}
                                                    // handleClickAway={handleClickAway}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ marginTop: 10, paddingLeft: 40 }}>
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            size="small"
                                            startIcon={<AddIcon />}
                                            onClick={addNewFilter}
                                            disabled={
                                                filterableColumns.filter(
                                                    (el) =>
                                                        !fields.find((rm) => rm.column === el.field) &&
                                                        el.filterable !== false
                                                ).length <= 0
                                            }
                                        >
                                            Lisää suodatin
                                        </Button>
                                        <Button size="small" type="submit">
                                            Suodata
                                        </Button>
                                        <Button id="resetfilterbutton" size="small" onClick={resetFilter}>
                                            Resetoi
                                        </Button>
                                    </Stack>
                                </div>
                            </Stack>
                        </form>
                    </Paper>
                </div>
            ) : null}
        </>
    );
};

export default DataGridCustomFilter;
