import { yupResolver } from '@hookform/resolvers/yup';
import FormGroup from '@mui/material/FormGroup';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { FormProps } from './Form.types';

export function Form<T extends FieldValues>({
	children,
	action,
	schema,
	defaultValues,
	mode = 'onBlur',
	render,
	myRef
}: FormProps<T>) {
	const methods = useForm<T>({
		resolver: schema ? yupResolver(schema) : undefined,
		defaultValues,
		mode
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(action(methods.reset))} ref={myRef}>
				<FormGroup
					sx={{
						'& > *:not(:last-child)': {
							marginBottom: theme => theme.spacing(2)
						}
					}}
				>
					{render ? render(methods) : children}
				</FormGroup>
			</form>
		</FormProvider>
	);
}
