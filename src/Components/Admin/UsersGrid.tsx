import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Stack, Button } from '@mui/material';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
    /* GridToolbarFilterButton, */
    getGridStringOperators,
    getGridSingleSelectOperators,
} from '@mui/x-data-grid';

import TypographyTitle from '../TypographyTitle';

import type { GridColDef, GridFilterModel, GridFilterItem, GridValueGetterParams } from '@mui/x-data-grid';
import { type UserFullResponseSchema, usersApi } from '../../api';
import CustomDataGridToolBarPanel from './Panel/CustomDataGridToolBarPanel';
function UsersGrid() {
    //const { count, next, previous, results } = useLoaderData() as Awaited<ReturnType<typeof usersListLoader>>;

    const [rowData, setRowData] = useState<UserFullResponseSchema[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 25,
    });
    const [quickFilterModel, setQuickFilterModel] = useState<GridFilterModel>({
        items: [],
        quickFilterValues: [''],
    });
    const [filterItems, setFilterItems] = useState<GridFilterItem[]>([]);

    const fetchData = async (
        page: number,
        pageSize: number,
        email?: string | undefined,
        firstName?: string | undefined,
        groups?: number[] | undefined,
        isActive?: boolean | undefined,
        lastName?: string | undefined,
        ordering?: string | undefined,
        phoneNumber?: string | undefined
    ) => {
        const { data: users } = await usersApi.usersList(
            email,
            firstName,
            groups,
            isActive,
            lastName,
            ordering,
            page,
            pageSize,
            phoneNumber
        );
        const results = users.results !== undefined ? users.results : [];
        setRowData(results);
        setTotalAmount(users.count !== undefined ? users.count : 0);
    };
    useEffect(() => {
        fetchData(paginationModel.page + 1, paginationModel.pageSize);
    }, []);

    const groupNames: { [key: string]: string } = {
        user_group: 'Käyttäjä',
        admin_group: 'Ylläpitäjä',
        storage_group: 'Varastotyöntekijä',
        deactive: 'Epäaktiivinen',
    };

    const containFilterOperator = getGridStringOperators().filter((val) => val.value === 'contains');
    const equalFilterOperator = getGridSingleSelectOperators().filter((operator) => operator.value === 'is');
    const activeOptions: { value: string; label: string }[] = [
        { value: 'true', label: 'Käytössä' },
        { value: 'false', label: 'Ei käytössä' },
    ];
    const groupOptions: { value: string; label: string }[] = [
        { value: 'user_group', label: 'Käyttäjä' },
        { value: 'admin_group', label: 'Ylläpitäjä' },
        { value: 'storage_group', label: 'Varastotyöntekijä' },
        { value: 'deactive', label: 'Epäaktiivinen' },
    ];
    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Sähköposti', flex: 1, filterOperators: containFilterOperator },
        {
            field: 'username',
            headerName: 'Käyttäjänimi',
            flex: 1,
            filterOperators: containFilterOperator,
            filterable: false,
        },
        { field: 'first_name', headerName: 'Etunimi', filterOperators: containFilterOperator },
        { field: 'last_name', headerName: 'Sukunimi', filterOperators: containFilterOperator },
        { field: 'phone_number', headerName: 'Puhelinnumero', flex: 1, filterOperators: containFilterOperator },
        {
            field: 'group',
            headerName: 'Oikeudet',
            valueGetter: (params: GridValueGetterParams) => groupNames[params.row.group],
            filterOperators: equalFilterOperator,
            valueOptions: groupOptions,
            filterable: false,
        },
        {
            field: 'is_active',
            headerName: 'Tila',
            valueGetter: (params: GridValueGetterParams) =>
                params.row.is_active === true ? 'Käytössä' : 'Ei käytössä',
            valueOptions: activeOptions,
            filterOperators: equalFilterOperator,
            filterable: false,
        },
        {
            field: 'id',
            headerName: 'Toiminnot',
            filterable: false,
            renderCell: (params) => (
                <Button component={Link} to={`/admin/kayttajat/${params.value}`} variant="outlined">
                    Avaa
                </Button>
            ),
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
        // 'filterOperator=': '=',
        // 'filterOperator!=': '!=',
        // 'filterOperator>': '>',
        // 'filterOperator>=': '>=',
        // 'filterOperator<': '<',
        // 'filterOperator<=': '<=',

        // Header filter operators text
        // headerFilterOperatorContains: 'Contains',
        // headerFilterOperatorEquals: 'Equals',
        // headerFilterOperatorStartsWith: 'Starts with',
        // headerFilterOperatorEndsWith: 'Ends with',
        // headerFilterOperatorIs: 'Is',
        // headerFilterOperatorNot: 'Is not',
        // headerFilterOperatorAfter: 'Is after',
        // headerFilterOperatorOnOrAfter: 'Is on or after',
        // headerFilterOperatorBefore: 'Is before',
        // headerFilterOperatorOnOrBefore: 'Is on or before',
        // headerFilterOperatorIsEmpty: 'Is empty',
        // headerFilterOperatorIsNotEmpty: 'Is not empty',
        // headerFilterOperatorIsAnyOf: 'Is any of',
        // 'headerFilterOperator=': 'Equals',
        // 'headerFilterOperator!=': 'Not equals',
        // 'headerFilterOperator>': 'Greater than',
        // 'headerFilterOperator>=': 'Greater than or equal to',
        // 'headerFilterOperator<': 'Less than',
        // 'headerFilterOperator<=': 'Less than or equal to',

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

    const onSubmit = async (formdata: {
        filterForm: Array<{ column: string; filter: string; value: string; andor: string | undefined }>;
    }) => {
        let groups = undefined;
        let firstName = undefined;
        let isActive = undefined;
        let lastName = undefined;
        let phoneNumber = undefined;
        let ordering = undefined;
        let email = undefined;
        let items: GridFilterItem[] = [];
        if (formdata.filterForm.length > 0)
            formdata.filterForm.map((form) => {
                const column = form.column;
                const filter = form.filter;
                const value = form.value;
                const andor = form.andor;
                items.push({ field: column, operator: filter, value: value });
                switch (column) {
                    case 'email':
                        email = value;
                        break;
                    case 'first_name':
                        firstName = value;
                        break;
                    case 'last_name':
                        lastName = value;
                        break;
                    case 'phone_number':
                        phoneNumber = value;
                        break;
                    case 'group':
                        groups = value;
                        break;
                    case 'is_active':
                        isActive = value;
                        break;
                }
                console.log(column, value);
                if (andor == 'and') {
                    console.log('jippii');
                }
            });
        fetchData(1, paginationModel.pageSize, email, firstName, groups, isActive, lastName, ordering, phoneNumber);

        setFilterItems(items);
    };

    if (!rowData) return null;
    const GridX = () => {
        return (
            <div style={{ height: 500 }}>
                <DataGrid
                    // paginationMode={'server'}
                    // rowCount={pageCount}
                    rowCount={totalAmount}
                    rows={rowData}
                    columns={columns}
                    sortingMode="server"
                    filterMode="server"
                    paginationMode="server"
                    pagination
                    paginationModel={paginationModel}
                    filterModel={quickFilterModel}
                    onPaginationModelChange={async (newPaginationModel) => {
                        // fetch data from server
                        setPaginationModel(newPaginationModel);
                        fetchData(newPaginationModel.page + 1, newPaginationModel.pageSize);
                    }}
                    onSortModelChange={async (newSortModel) => {
                        console.log(newSortModel);
                    }}
                    onFilterModelChange={async (newFilterModel) => {
                        // fetch data from server
                        console.log(newFilterModel);
                        setPaginationModel({
                            page: 0,
                            pageSize: paginationModel.pageSize,
                        });
                        fetchData(
                            1,
                            paginationModel.pageSize,
                            newFilterModel.quickFilterValues ? newFilterModel.quickFilterValues[0] : undefined
                        );

                        setQuickFilterModel({ items: [], quickFilterValues: newFilterModel.quickFilterValues });
                    }}
                    slots={{
                        toolbar: () => {
                            return (
                                <CustomDataGridToolBarPanel
                                    columns={columns}
                                    localizedTextsMap={localizedTextsMap}
                                    onSubmit={onSubmit}
                                    setFilterItems={setFilterItems}
                                    filterItems={filterItems}
                                />
                            );
                        },
                    }}
                    // checkboxSelection
                    localeText={localizedTextsMap}
                    // showColumnVerticalBorder
                    // showCellVerticalBorder
                    // loading
                />
            </div>
        );
    };

    return (
        <Stack id="components-stack" alignItems="center" width="100%">
            <TypographyTitle text="Kaikki käyttäjät" />
            <div
                id="datagrid-parent"
                style={{ display: 'flex', height: '100%', width: '100%', margin: '1rem 0 1rem 0' }}
            >
                <div id="datagrid-child" style={{ flex: 1 }}>
                    <GridX />
                </div>
            </div>
        </Stack>
    );
}

export default UsersGrid;
