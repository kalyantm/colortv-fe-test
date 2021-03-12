import { Input, InputProps, makeStyles } from '@material-ui/core';
import React from 'react';

const SearchInput = (props: InputProps) => {
	const classes = useStyles();
	return <Input {...props} classes={{ root: classes.customRoot, input: classes.customInput }} />;
};

const useStyles = makeStyles((theme) => ({
	customRoot: {
		color: 'inherit',
	},
	customInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		border: '1px solid #fff',
		borderRadius: '10px',
	},
}));

export default SearchInput;
