import { AppBar, Box, Dialog, Grid, IconButton, Theme, Toolbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import PhotoCard from './PhotoCard';

export interface Photo {
	id: string;
	urls: {
		thumb: string;
		regular: string;
		large: string;
	};
	alt_description: string;
}

const PhotoListGrid = ({ photos }: { photos: Array<Photo> }) => {
	const classes = useStyles();
	const [fullScreenView, setFullScreenView] = React.useState<boolean>(false);
	const [selectedImage, setSelectedImage] = React.useState<Photo | null>(null);
	return (
		<>
			<Grid className={classes.wrapper} container spacing={6}>
				{photos.map((photo) => (
					<Grid item xs={3}>
						<PhotoCard
							photoInfo={photo}
							onClick={(photoInfo: Photo) => {
								setFullScreenView(true);
								setSelectedImage(photoInfo);
							}}
						/>
					</Grid>
				))}
			</Grid>

			<Dialog
				fullScreen
				open={fullScreenView}
				onClose={() => {
					setFullScreenView(false);
					setSelectedImage(null);
				}}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="end"
							color="primary"
							onClick={() => {
								setFullScreenView(false);
								setSelectedImage(null);
							}}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Box mt={6} display="flex" flexDirection="column" alignItems="center">
					<Box className={classes.imageSection}>
						<Carousel
							autoPlay={false}
							className={classes.carousel}
							index={photos.findIndex((photo) => photo.id === selectedImage?.id)}
						>
							{photos.map((photo) => (
								<img src={photo?.urls.regular} alt={photo?.alt_description} />
							))}
						</Carousel>
					</Box>
				</Box>
				<Box display="flex" justifyContent="center" mt={4}></Box>
			</Dialog>
		</>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		margin: theme.spacing(6),
	},
	appBar: {
		background: 'none',
		boxShadow: 'none',
		'& button': {
			position: 'absolute',
			right: theme.spacing(4),
		},
	},
	carousel: {
		width: 1024,
		height: 700,
		'& .CarouselItem': {
			width: '100%',
			height: '100%',
			'& div': {
				width: '100%',
				height: '100%',
			},
		},
		'& img': {
			borderRadius: theme.spacing(1),
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			overflow: 'hidden',
		},
	},
	imageSection: {
		margin: '0 auto',
		maxHeight: '50%',
	},
}));

export default PhotoListGrid;
