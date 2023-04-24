import React from 'react';
import {  CCardBody ,CButton , CSmartTable, CBadge, CCollapse } from '@coreui/react-pro';
import { useState } from 'react';

const usersData = [
	{ id: 8, name: 'Quintin Ed', registered: '2022/02/07', role: 'Admin', status: 'Inactive' },
	{ id: 9, name: 'Enéas Kwadwo', registered: '2022/03/19', role: 'Member', status: 'Pending' },
	{ id: 10, name: 'Agapetus Tadeáš', registered: '2022/01/21', role: 'Staff', status: 'Active' },
	{ id: 11, name: 'Carwyn Fachtna', registered: '2022/01/01', role: 'Member', status: 'Active' },
	{ id: 12, name: 'Nehemiah Tatius', registered: '2022/02/07', role: 'Staff', status: 'Banned' },
	{ id: 13, name: 'Ebbe Gemariah', registered: '2022/02/07', role: 'Admin', status: 'Inactive' },

];

const Inventario = () => {
	const [details, setDetails] = useState([]);
	const columns = [
		{
			key: 'name',
			_style: { width: '40%' },
			_props: { color: 'primary', className: 'fw-semibold' },
		},
		'registered',
		{ key: 'role', filter: false, sorter: false, _style: { width: '20%' } },
		{ key: 'status', _style: { width: '20%' } },
		{
			key: 'show_details',
			label: '',
			_style: { width: '1%' },
			filter: false,
			sorter: false,
			_props: { color: 'primary', className: 'fw-semibold' },
		},
	];


	const getBadge = (status) => {
		switch (status) {
		case 'Active':
			return 'success';
		case 'Inactive':
			return 'secondary';
		case 'Pending':
			return 'warning';
		case 'Banned':
			return 'danger';
		default:
			return 'primary';
		}
	};
	const toggleDetails = (index) => {
		const position = details.indexOf(index);
		let newDetails = details.slice();
		if (position !== -1) {
			newDetails.splice(position, 1);
		} else {
			newDetails = [...details, index];
		}
		setDetails(newDetails);
	};
	return (
		<CSmartTable
			activePage={3}
			cleaner
			clickableRows
			columns={columns}
			columnFilter
			columnSorter
			footer
			items={usersData}
			itemsPerPageSelect
			itemsPerPage={5}
			pagination
			scopedColumns={{
				status: (item) => (
					<td>
						<CBadge color={getBadge(item.status)}>{item.status}</CBadge>
					</td>
				),
				show_details: (item) => {
					return (
						<td className="py-2">
							<CButton
								color="primary"
								variant="outline"
								shape="square"
								size="sm"
								onClick={() => {
									toggleDetails(item.id);
								}}
							>
								{details.includes(item.id) ? 'Hide' : 'Show'}
							</CButton>
						</td>
					);
				},
				details: (item) => {
					return (
						<CCollapse visible={details.includes(item.id)}>
							<CCardBody>
								<h4>{item.username}</h4>
								<p className="text-muted">User since: {item.registered}</p>
								<CButton size="sm" color="info">
                User Settings
								</CButton>
								<CButton size="sm" color="danger" className="ml-1">
                Delete
								</CButton>
							</CCardBody>
						</CCollapse>
					);
				},
			}}
			selectable
			sorterValue={{ column: 'name', state: 'asc' }}
			tableFilter
			tableHeadProps={{
				color: 'danger',
			}}
			tableProps={{
				striped: true,
				hover: true,
			}}
		/>
	);
};
export default Inventario;