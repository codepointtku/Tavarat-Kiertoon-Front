import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

// TODO: Move mockData to its own file
const mockData = [
    {
        id: '1',
        productName: 'Piirtoheitin',
        description: 'Hyväkuntone piirtoheitin suoraa 80-luvulta',
        dateAdded: '01.06.1999',
    },
    {
        id: '2',
        productName: 'Jakkara',
        description: 'Eläköityneen rehtorin luotettava jakkara',
        dateAdded: '01.01.2023',
    },
    {
        id: '3',
        productName: 'Bob Rossin pensselit',
        description: '5 kpl setti eri paksusia, jouhet ok, vähän maalinjämiä',
        dateAdded: '01.01.2023',
    },
    {
        id: '4',
        productName: 'Vichy-pullo',
        description: 'Tyhjä',
        dateAdded: '01.01.2023',
    },
    {
        id: '5',
        productName: 'Kahvinkeitin',
        description: 'Alalemun koulu osti opehuoneeseen uuden mokkamasterin, tää wanha jäi ylimääräseks',
        dateAdded: '01.01.2023',
    },
    {
        id: '6',
        productName: 'Joku missä on överipitkä teksti',
        description:
            'Katotaas mitä tapahtuu kun tähän kirjoittaa ihan älyttömän mällin tekstiä, jos joku vaikka innostuu copypasteemaan tähän descriptioniin vahingossa koko users manualin viidellä eri kielellä ja silleenspäin pois ja tuolleen noin ja siitä ja puita!',
        dateAdded: '01.01.2023',
    },
    {
        id: '1',
        productName: 'Piirtoheitin',
        description: 'Hyväkuntone piirtoheitin suoraa 80-luvulta',
        dateAdded: '01.06.1999',
    },
    {
        id: '2',
        productName: 'Jakkara',
        description: 'Eläköityneen rehtorin luotettava jakkara',
        dateAdded: '01.01.2023',
    },
    {
        id: '3',
        productName: 'Bob Rossin pensselit',
        description: '5 kpl setti eri paksusia, jouhet ok, vähän maalinjämiä',
        dateAdded: '01.01.2023',
    },
    {
        id: '4',
        productName: 'Vichy-pullo',
        description: 'Tyhjä',
        dateAdded: '01.01.2023',
    },
    {
        id: '5',
        productName: 'Kahvinkeitin',
        description: 'Alalemun koulu osti opehuoneeseen uuden mokkamasterin, tää wanha jäi ylimääräseks',
        dateAdded: '01.01.2023',
    },
    {
        id: '6',
        productName: 'Joku missä on överipitkä teksti',
        description:
            'Katotaas mitä tapahtuu kun tähän kirjoittaa ihan älyttömän mällin tekstiä, jos joku vaikka innostuu copypasteemaan tähän descriptioniin vahingossa koko users manualin viidellä eri kielellä ja silleenspäin pois ja tuolleen noin ja siitä ja puita!',
        dateAdded: '01.01.2023',
    },
];

function ProductList() {
    return (
        <Grid container spacing={2}>
            {mockData?.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard
                        id={product.id}
                        productName={product.productName}
                        description={product.description}
                        dateAdded={product.dateAdded}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
