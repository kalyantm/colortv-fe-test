import { Box, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Photo } from './PhotoListGrid';

const PhotoCard = ({ photoInfo, onClick }: { photoInfo: Photo; onClick: (photoInfo: Photo) => void }) => {
	const classes = useStyles();
	return (
		<Box className={classes.wrapper} onClick={() => onClick(photoInfo)}>
			<img src={photoInfo.urls.thumb} alt={photoInfo.alt_description} />
		</Box>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		height: '100%',
		display: 'block',
		padding: theme.spacing(3, 2),
		borderRadius: '10px',
		width: '300px',
		maxHeight: '225px',
		'& img': {
			borderRadius: theme.spacing(1),
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			overflow: 'hidden',
		},
	},
}));

export default PhotoCard;
