import { useTypedSelector } from '@/hooks/useTypedSelector';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Wrapper = styled.div``;

const Order = () => {
	const { items } = useTypedSelector((state) => state.cart);

	return (
		<Wrapper>
			<p style={{ fontSize: '16pt' }}>Order:</p>
			{/* TODO: Create special component for this */}
			{/* Rewrite to grid */}
			{items &&
				items.map((item) => (
					<div
						key={item.asin}
						style={{ display: 'flex', borderBottom: '1px solid lightgray' }}
					>
						<div
							className="ju-al-center"
							style={{ minWidth: '140px', padding: '5px 10px' }}
						>
							<Image
								width={0}
								height={0}
								style={{ width: 'auto', height: '140px' }}
								alt={`Product ${item.asin}`}
								loader={() => item.image.link}
								src={item.image.link}
							/>
						</div>
						<div
							style={{
								display: 'grid',
								// justifyContent: 'space-between',
								gridTemplateColumns: '3fr 1fr 1fr 1fr',
								gap: '25px',
								paddingTop: '20px',
								width: '100%',
							}}
						>
							<div
								style={{
									width: '100%',
									fontSize: '12pt',
								}}
							>
								<p>{item.title.substring(0, 150)}</p>
							</div>
							<div>
								<div>
									<p style={{ color: 'grey', marginBottom: '5px' }}>Price</p>
									<div>
										{item.rrp ? <del>{item.rrp.raw}</del> : null}
										<p style={{ fontSize: '12pt', fontWeight: 'bold' }}>
											{'$' + item?.price?.value || 'Sold'}
										</p>
									</div>
								</div>
							</div>
							<div>
								<p style={{ color: 'grey', marginBottom: '5px' }}>Quantity</p>
								<p>{item.quantity}</p>
							</div>
							<div>
								<p style={{ color: 'grey', marginBottom: '5px' }}>Total</p>
								<p>
									{item?.price?.value ? (
										'$' + item.price.value * item.quantity
									) : (
										<></>
									)}
								</p>
							</div>
						</div>
					</div>
				))}
		</Wrapper>
	);
};

export default Order;
