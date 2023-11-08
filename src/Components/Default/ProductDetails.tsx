import { useLoaderData, useParams, useRouteLoaderData, Link, useLocation, Outlet } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { type SimilarProductCarouselProps } from './SimilarProductsCarousel';

import {
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    ImageList,
    ImageListItem,
    Container,
    Grid,
    Paper,
    Box,
    type ButtonPropsSizeOverrides,
    Button,
} from '@mui/material';

import AuthContext from '../../Context/AuthContext';
import BackButton from '../BackButton';
import AddToCartButton from './AddToCartButton';
import SimilarProductsCarousel from './SimilarProductsCarousel';
import type { productDetailsLoader } from '../../Router/loaders';
import type { rootLoader } from '../../Router/loaders';
import { type OverridableStringUnion } from '@material-ui/types';
import Barcode from 'react-barcode';

function ProductDetails() {
    const { product, products: productsInSameCategory } = useLoaderData() as Awaited<
        ReturnType<typeof productDetailsLoader>
    >;
    const { colors: allColors, categories } = useRouteLoaderData('root') as Awaited<ReturnType<typeof rootLoader>>;
    const { id: productId } = useParams();

    const { name: productName, free_description: description, amount, measurements, weight, colors } = product;
    const [image, setImage] = useState(product?.pictures[0]?.picture_address);
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    const productCategory = categories.find((category) => category.id === product.category);
    const productColors = allColors.filter((color) => colors.includes(color.id));
    const colorNames = productColors.map((color) => color.name);

    useEffect(() => {
        setImage(product?.pictures[0]?.picture_address);
    }, [product.pictures]);

    return (
        <Container id="product-detail-card">
            {/* TODO: Mobile usability */}
            <Grid container mt={2} mb={2}>
                <Grid item xs={1}>
                    <BackButton />
                </Grid>
                <Grid item xs={11}>
                    <Card>
                        <Grid container id="product-img-and-details-container">
                            <Grid item xs={6}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="product image"
                                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${image}`}
                                    />
                                </CardActionArea>
                                <ImageList cols={6} rowHeight={90} sx={{ mt: 0 }}>
                                    {product.pictures.map((pic) => (
                                        <ImageListItem
                                            key={pic.picture_address}
                                            onClick={() => setImage(pic.picture_address)}
                                        >
                                            <Card
                                                sx={{
                                                    border: image === pic.picture_address ? '2px ridge #009bd8' : '',
                                                    opacity: image === pic.picture_address ? 1 : 0.7,
                                                }}
                                                square
                                            >
                                                <CardActionArea>
                                                    <CardMedia
                                                        component={Box}
                                                        sx={{ alt: 'kuvan valinta' }}
                                                        height={100}
                                                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${pic.picture_address}`}
                                                    />
                                                </CardActionArea>
                                            </Card>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        align="center"
                                        component="div"
                                        color="primary.main"
                                    >
                                        {productName}
                                    </Typography>
                                    <Paper
                                        variant="outlined"
                                        component={Grid}
                                        container
                                        direction="column"
                                        gap={2}
                                        sx={{ p: 2, borderColor: 'primary.light' }}
                                    >
                                        <Grid item>
                                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                                Tuotekuvaus: {description}
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row" gap={4}>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Määrä: {amount}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Paino: {weight} kg
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Mitat: {measurements}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Värit: {colorNames?.join(', ')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" gap={2}>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Kategoria: {productCategory?.name}
                                                </Typography>
                                                {/* to be implemented when backend is ready */}
                                            </Grid>
                                            {/* miten näyttää kategoriat, buttoneina? */}
                                        </Grid>
                                    </Paper>
                                    <Grid container justifyContent="center" sx={{ mt: 5 }}>
                                        <CardActions>
                                            <Grid container direction="row" gap={2}>
                                                {location.pathname.includes('admin') ||
                                                location.pathname.includes('varasto') ? null : (
                                                    <AddToCartButton
                                                        size={
                                                            'large' as OverridableStringUnion<
                                                                'small' | 'medium' | 'large',
                                                                ButtonPropsSizeOverrides
                                                            >
                                                        }
                                                        id={productId as number & string}
                                                        groupId={Number(productId)}
                                                    />
                                                )}
                                                {(auth.storage_group || auth.admin_group) && (
                                                    <>
                                                        <Button
                                                            component={Link}
                                                            to={`/varasto/tuotteet/${productId}/muokkaa`}
                                                            size="large"
                                                            color="primary"
                                                            sx={{ marginY: 2 }}
                                                        >
                                                            Muokkaa tuotetta
                                                        </Button>
                                                        <Button
                                                            component={Link}
                                                            to={`/varasto/tuotteet/${productId}/palauta`}
                                                            replace
                                                            size="large"
                                                            color="primary"
                                                            sx={{ marginY: 2 }}
                                                        >
                                                            Palauta tuotteita varastoon
                                                        </Button>
                                                        {/* Show return products to storage form */}
                                                        <Outlet />
                                                    </>
                                                )}
                                            </Grid>
                                        </CardActions>
                                    </Grid>
                                    {(auth.storage_group || auth.admin_group) && (
                                        // TODO: layout
                                        <Grid container justifyContent="center">
                                            <Typography gutterBottom variant="h5" component="div" color="primary">
                                                Yksityiskohtaiset tiedot
                                            </Typography>
                                            <Paper variant="outlined" sx={{ p: 5 }} color="primary">
                                                <Typography variant="body2" color="text.secondary">
                                                    Kokonaismäärä järjestelmässä: {product.total_amount}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Tilattavissa: {product.amount}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Hinta: {product.price} €
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary">
                                                    Varasto:{' '}
                                                    {product.product_items
                                                        .map((item) => item.storage.name)
                                                        .filter((name, index, self) => self.indexOf(name) === index)
                                                        .map((name) => (
                                                            <span key={name}>
                                                                {name}
                                                                {': '}
                                                                {
                                                                    product.product_items.filter(
                                                                        (item) => item.storage.name === name
                                                                    ).length
                                                                }
                                                                {' kpl'}
                                                            </span>
                                                        ))}
                                                    {', '}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Hylly/paikka:
                                                    {product.product_items[0]?.shelf_id || ' ei hyllypaikkaa'}
                                                    {/* Support for multiple shelves, if that feature is implemented: */}
                                                    {/* {product.product_items
                                                        .map((item) => item.shelf_id)
                                                        .filter((shelf, index, self) => self.indexOf(shelf) === index)
                                                        .map((shelf) => (
                                                            <span key={shelf}>
                                                                {shelf}
                                                                {': '}
                                                                {
                                                                    product.product_items.filter(
                                                                        (item) => item.shelf_id === shelf
                                                                    ).length
                                                                }
                                                                {' kpl'}
                                                            </span>
                                                        ))} */}
                                                </Typography>
                                                <Paper
                                                    elevation={3}
                                                    sx={{
                                                        border: '1px solid black',
                                                        borderRadius: 1,
                                                        minHeight: '7rem',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: 'fit-content',
                                                        paddingX: '1rem',
                                                        marginTop: '1rem',
                                                    }}
                                                    // TODO : add onClick to open a page to print barcodes
                                                    // onClick={() => setQrScanOpen(true)}
                                                >
                                                    {/* // TODO: support multiple barcodes */}
                                                    {product?.product_items[0].barcode?.length > 0 && (
                                                        <Barcode
                                                            value={product.product_items[0].barcode}
                                                            format="CODE39"
                                                            height={64}
                                                            fontSize={14}
                                                        />
                                                    )}
                                                </Paper>
                                            </Paper>
                                        </Grid>
                                    )}
                                </CardContent>
                            </Grid>
                        </Grid>
                        <>
                            {!location.pathname.includes('admin') ||
                                (!location.pathname.includes('varasto') && (
                                    <Box sx={{ mx: 2 }}>
                                        {productsInSameCategory.results &&
                                            productsInSameCategory.results.length > 1 && (
                                                <>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                        color="primary.main"
                                                        sx={{ mt: '7rem' }}
                                                    >
                                                        Samankaltaisia tuotteita
                                                    </Typography>
                                                    <SimilarProductsCarousel
                                                        currentId={Number(productId)}
                                                        similarProducts={
                                                            productsInSameCategory as unknown as SimilarProductCarouselProps['similarProducts']
                                                        }
                                                    />
                                                </>
                                            )}
                                    </Box>
                                ))}
                            {location.pathname.includes('varasto') && (
                                // list of product_items, with their storage and barcode, and logs
                                <Paper variant="outlined" sx={{ p: 5 }} color="primary">
                                    <Typography variant="h5" color="primary">
                                        Tuotteen lokitiedot
                                    </Typography>
                                    <Grid container justifyContent="center" sx={{ mt: 5 }}>
                                        {product?.product_items?.map((item) => (
                                            <Grid
                                                key={item.id}
                                                container
                                                direction="row"
                                                justifyContent="space-evenly"
                                                sx={{
                                                    border: 1,
                                                    borderColor: 'primary.light',
                                                    borderRadius: 2,
                                                    padding: 2,
                                                    margin: 1,
                                                }}
                                            >
                                                <Grid item>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Yksittäisen tuotteen id järjestelmässä: {item?.id}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Varasto: {item?.storage.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Viivakoodi: {item?.barcode}
                                                    </Typography>

                                                    {/* <Typography variant="body2" color="text.secondary">
                                                        Tila: {item?.status}
                                                    </Typography> */}
                                                </Grid>
                                                <Grid item>
                                                    <Typography gutterBottom variant="body1" color="text.secondary">
                                                        Tapahtumat:
                                                    </Typography>
                                                    {item.log_entries?.map((log) => (
                                                        <Box key={log.id}>
                                                            <Typography
                                                                key={log.id}
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                {new Date(log?.date).toLocaleString('fi-FI')}{' '}
                                                                {log?.action}{' '}
                                                                {auth.admin_group ? (
                                                                    <Link to={`/admin/kayttajat/${log?.user}`}>
                                                                        Käyttäjä:{log?.user}
                                                                    </Link>
                                                                ) : (
                                                                    `Käyttäjä: ${log?.user}`
                                                                )}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>
                            )}
                        </>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductDetails;
