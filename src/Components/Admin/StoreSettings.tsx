import { useFetcher, useLoaderData } from 'react-router-dom';
import { Stack, Container, Button, Box, TextField, IconButton } from '@mui/material';

import HeroHeader from '../HeroHeader';
import HeroText from '../HeroText';
import { format } from 'date-fns';

import SettingsIcon from '@mui/icons-material/Settings';

import type { pauseStoreLoader } from '../../Router/loaders';

import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarContainer,
    useGridApiContext,
} from '@mui/x-data-grid';
import type {
    GridColDef,
    GridEventListener,
    GridRowModesModel,
    GridRowsProp,
    GridValueFormatterParams,
    GridRowId,
    GridRowModel,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fi } from 'date-fns/locale';
import ClearIcon from '@mui/icons-material/Clear';

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
    const apiRef = useGridApiContext();
    const handleClick = () => {
        const rowids = apiRef.current.getAllRowIds().sort(function (a: any, b: any) {
            return a - b;
        });

        let id = -1;
        if (rowids.length > 0) {
            id = Number(rowids[rowids.length - 1]) + 1;
        }

        setRows((oldRows) => [...oldRows, { id: id, start_date: new Date(), end_date: new Date(), isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'start_date' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Lisää tauko
            </Button>
        </GridToolbarContainer>
    );
}

function StoreSettings() {
    const { data } = useLoaderData() as Awaited<ReturnType<typeof pauseStoreLoader>>;
    const fetcher = useFetcher();
    const [rows, setRows] = useState<GridRowsProp>(data);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        let data = {
            start_date: format(new Date(newRow.start_date), 'yyyy-MM-dd'),
            end_date: format(new Date(newRow.end_date), 'yyyy-MM-dd'),
            id: newRow.id,
        };

        fetcher.submit(data, {
            method: newRow.isNew ? 'post' : 'put',
        });
        const updatedRow = { ...newRow, isNew: false, id: -1 };
        const newrows = [...rows];
        const new2 = newrows.find((row) => row.id === newRow.id);
        if (new2) {
            new2.isNew = false;
            new2.id = -1;
        }
        setRows(newrows);
        return updatedRow;
    };

    useEffect(() => {
        if (fetcher.data?.data) {
            const newrows = [...rows];
            const new2 = newrows.find((row) => row.id === -1);
            if (new2) {
                new2.id = fetcher.data.data.id;
                new2.start_date = fetcher.data.data.start_date;
                new2.end_date = fetcher.data.data.end_date;
            }
            setRows(newrows);
        }
    }, [fetcher.data]);
    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        const data = {
            id: id.toString(),
        };
        fetcher.submit(data, {
            method: 'DELETE',
        });
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };
    const DatePickerEditInputCell = (cellData: any) => {
        const { id, field, value } = cellData;
        const ref = useGridApiContext();
        const handleChange = async (event: any) => {
            ref.current.setEditCellValue({ id, field, value: event });
        };
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
                <DatePicker
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <Box sx={{ position: 'relative', display: 'inline-block', width: 'max-content' }}>
                            <TextField {...params} />
                            <IconButton style={{ position: 'absolute', top: '.5rem', margin: 'auto', right: '30px' }}>
                                <ClearIcon />
                            </IconButton>
                        </Box>
                    )}
                    minDate={cellData.row && field === 'end_date' ? cellData.row.start_date : new Date()}
                    views={['month', 'day']}
                    openTo="month"
                />
            </LocalizationProvider>
        );
    };
    const columns: GridColDef[] = [
        {
            field: 'start_date',
            headerName: 'Aloituspäivä',
            flex: 1,
            type: 'date',
            editable: true,
            valueGetter: (params) => {
                return new Date(params.value);
            },
            renderEditCell: (params) => {
                const inputProps = { max: params.row.licensesAvailable, min: 0 };

                return <DatePickerEditInputCell {...params} inputProps={inputProps} type="date" />;
            },
            valueFormatter: (params: GridValueFormatterParams<Date>) => {
                if (params.value == null) {
                    return '';
                }
                return new Date(params.value).toLocaleDateString('fi-fi');
            },
        },
        {
            field: 'end_date',
            headerName: 'Lopetuspäiviä',
            flex: 2,
            type: 'date',
            editable: true,
            valueGetter: (params) => {
                return new Date(params.value);
            },
            //renderEditCell: DateEditInputCell,
            renderEditCell: (params) => {
                const inputProps = { max: params.row.licensesAvailable, min: 0 };

                return <DatePickerEditInputCell {...params} inputProps={inputProps} type="date" />;
            },
            valueFormatter: (params: GridValueFormatterParams<Date>) => {
                if (params.value == null) {
                    return '';
                }
                return new Date(params.value).toLocaleDateString('fi-fi');
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key="save"
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key="cancel"
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key="edit"
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    const localizedTextsMap = {
        // https://github.com/mui/mui-x/blob/master/packages/grid/x-data-grid/src/locales/fiFI.ts
        // Root
        noRowsLabel: 'Ei rivejä',
        noResultsOverlayLabel: 'Ei tuloksia.',

        // Density selector toolbar button text
        toolbarDensity: 'Rivit',
        toolbarDensityLabel: 'Riviväli',
        toolbarDensityCompact: 'Kompakti',
        toolbarDensityStandard: 'Vakio',
        toolbarDensityComfortable: 'Tilava',

        // Columns selector toolbar button text
        toolbarColumns: 'Kolumnit',
        toolbarColumnsLabel: 'Valitse kolumnit',

        // Filters toolbar button text
        toolbarFilters: 'Suodattimet',
        toolbarFiltersLabel: 'Näytä suodattimet',
        toolbarFiltersTooltipHide: 'Piilota suodattimet',
        toolbarFiltersTooltipShow: 'Näytä suodattimet',
        toolbarFiltersTooltipActive: (count: any) =>
            count !== 1 ? `${count} aktiivista suodatinta` : `${count} aktiivinen suodatin`,

        // Quick filter toolbar field
        toolbarQuickFilterPlaceholder: 'Hae…',
        toolbarQuickFilterLabel: 'Hae',
        toolbarQuickFilterDeleteIconLabel: 'Tyhjennä',

        // Export selector toolbar button text
        toolbarExport: 'Vie',
        toolbarExportLabel: 'Vie',
        toolbarExportCSV: 'Lataa CSV-muodossa',
        toolbarExportPrint: 'Tulosta',
        toolbarExportExcel: 'Lataa Excel-muodossa',

        // Columns panel text
        columnsPanelTextFieldLabel: 'Etsi kolumni',
        columnsPanelTextFieldPlaceholder: 'Kolumnin otsikko',
        columnsPanelDragIconLabel: 'Järjestä kolumni uudelleen',
        columnsPanelShowAllButton: 'Näytä kaikki',
        columnsPanelHideAllButton: 'Piilota kaikki',

        // Filter panel text
        filterPanelAddFilter: 'Lisää suodatin',
        // filterPanelRemoveAll: 'Remove all',
        filterPanelDeleteIconLabel: 'Poista',
        filterPanelLogicOperator: 'Logiikkaoperaattori',
        filterPanelOperator: 'Operaattorit',
        filterPanelOperatorAnd: 'Ja',
        filterPanelOperatorOr: 'Tai',
        filterPanelColumns: 'Kolumnit',
        filterPanelInputLabel: 'Arvo',
        filterPanelInputPlaceholder: 'Suodattimen arvo',

        // Filter operators text
        filterOperatorContains: 'sisältää',
        filterOperatorEquals: 'on yhtä suuri',
        filterOperatorStartsWith: 'alkaa',
        filterOperatorEndsWith: 'päättyy',
        filterOperatorIs: 'on',
        filterOperatorNot: 'ei ole',
        filterOperatorAfter: 'on jälkeen',
        filterOperatorOnOrAfter: 'on sama tai jälkeen',
        filterOperatorBefore: 'on ennen',
        filterOperatorOnOrBefore: 'on sama tai ennen',
        filterOperatorIsEmpty: 'on tyhjä',
        filterOperatorIsNotEmpty: 'ei ole tyhjä',
        filterOperatorIsAnyOf: 'mikä tahansa seuraavista',

        // Filter values text
        filterValueAny: 'mikä tahansa',
        filterValueTrue: 'tosi',
        filterValueFalse: 'epätosi',

        // Column menu text
        columnMenuLabel: 'Valikko',
        columnMenuShowColumns: 'Näytä kolumnit',
        // columnMenuManageColumns: 'Manage columns',
        columnMenuFilter: 'Suodata',
        columnMenuHideColumn: 'Piilota',
        columnMenuUnsort: 'Poista järjestys',
        columnMenuSortAsc: 'Järjestä nousevasti',
        columnMenuSortDesc: 'Järjestä laskevasti',

        // Column header text
        columnHeaderFiltersTooltipActive: (count: any) =>
            count !== 1 ? `${count} aktiivista suodatinta` : `${count} aktiivinen suodatin`,
        columnHeaderFiltersLabel: 'Näytä suodattimet',
        columnHeaderSortIconLabel: 'Järjestä',

        // Rows selected footer text
        footerRowSelected: (count: any) =>
            count !== 1 ? `${count.toLocaleString()} riviä valittu` : `${count.toLocaleString()} rivi valittu`,

        // Total row amount footer text
        footerTotalRows: 'Rivejä yhteensä:',

        // Total visible row amount footer text
        footerTotalVisibleRows: (visibleCount: any, totalCount: any) =>
            `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,

        // Checkbox selection text
        checkboxSelectionHeaderName: 'Valintaruutu',
        checkboxSelectionSelectAllRows: 'Valitse kaikki rivit',
        checkboxSelectionUnselectAllRows: 'Poista kaikkien rivien valinta',
        checkboxSelectionSelectRow: 'Valitse rivi',
        checkboxSelectionUnselectRow: 'Poista rivin valinta',

        // Boolean cell text
        booleanCellTrueLabel: 'tosi',
        booleanCellFalseLabel: 'epätosi',

        // Actions cell more text
        actionsCellMore: 'lisää',

        // Column pinning text
        pinToLeft: 'Kiinnitä vasemmalle',
        pinToRight: 'Kiinnitä oikealle',
        unpin: 'Irrota kiinnitys',

        // Tree Data
        treeDataGroupingHeaderName: 'Ryhmä',
        treeDataExpand: 'Laajenna',
        treeDataCollapse: 'Supista',

        // Grouping columns
        groupingColumnHeaderName: 'Ryhmä',
        groupColumn: (name: any) => `Ryhmittelyperuste ${name}`,
        unGroupColumn: (name: any) => `Poista ryhmittelyperuste ${name}`,

        // Master/detail
        detailPanelToggle: 'Yksityiskohtapaneelin vaihto',
        expandDetailPanel: 'Laajenna',
        collapseDetailPanel: 'Tiivistä',

        // Row reordering text
        rowReorderingHeaderName: 'Rivien uudelleenjärjestely',

        // Aggregation
        aggregationMenuItemHeader: 'Koostaminen',
        aggregationFunctionLabelSum: 'summa',
        aggregationFunctionLabelAvg: 'ka.',
        aggregationFunctionLabelMin: 'min.',
        aggregationFunctionLabelMax: 'maks.',
        aggregationFunctionLabelSize: 'koko',
    };

    return (
        <Container maxWidth="lg">
            <HeroHeader Icon={<SettingsIcon />} hideInAdmin />
            <HeroText title="Järjestelmän asetukset" />
            <Stack id="admin-settings-stack" sx={{ m: '1rem 0 1rem 0' }}>
                järjestelmä tauolla
                <DataGrid
                    rowCount={data.length}
                    rows={rows}
                    columns={columns}
                    // checkboxSelection
                    localeText={localizedTextsMap}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => {
                        console.error(error);
                    }}
                    slots={{ toolbar: EditToolbar }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Stack>
        </Container>
    );
}

export default StoreSettings;
