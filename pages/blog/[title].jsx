import Head from 'next/head'
import {useRouter} from 'next/router';

import axios from "axios";
import Footer from "../../components/Footer";
import Separator from "../../components/Seperator";
import {useMemo} from "react";

export default function Blog({articleDes, quote}) {
	const router = useRouter()

	const article = useMemo(()=>{
		return articleDes.split('\n\n');
	},[])

	const title = useMemo(() => {
		return (router.query.title).replaceAll('-', ' ')
	}, [])

	return (
		<div className='max-w-3xl px-4 py-8 flex flex-col gap-10 mx-auto'>
			<Head>
				<title>{title}</title>
			</Head>

			<header className=''>
				<span className='text-gray-500'>← </span>
				<p className='text-gray-500 cursor-pointer hover:underline inline'
				   onClick={router.back}>back to list</p>
			</header>

			<main className='flex flex-col gap-3'>
				<p style={{fontFamily: 'times'}} className='font-bold text-[40px] text-gray-900'>{title}</p>
				{
					article.slice(0, 3).map((paragraph, index) => {
						return (
							<p className='indent-5 tracking-wide text-[1.1rem]' style={{fontFamily: 'times'}} key={index}>{paragraph}</p>
						)
					})
				}
				<picture className='flex flex-col items-stretch'>
					<img src={`https://picsum.photos/seed/${title}/1000`} alt={''}/>
					<figcaption className='text-center text-gray-500 italic text-sm py-1'>{title}</figcaption>
				</picture>

				<p style={{fontFamily: 'times'}}
				   className='italic text-[20px] py-3'>{`${String.fromCharCode(171, 34)}${quote.quote} - ${quote.author}${String.fromCharCode(187)}`}</p>
				{
					article.slice(3).map((paragraph, index) => {
						return (
							<p className='indent-5 tracking-wide text-[1.1rem]' style={{fontFamily: 'times'}} key={index}>{paragraph}</p>
						)
					})
				}
			</main>

			<picture className='flex flex-col items-stretch'>
				<img src={`https://picsum.photos/seed/${title.slice(-1)}/1000`} alt={''}/>
				<figcaption className='text-center text-gray-500 italic text-sm py-1'>{title}</figcaption>
			</picture>

			<Separator/>
			<Footer/>
		</div>
	);
}

export async function getServerSideProps() {
	let articleDes = '';
	let quote = '';
	await axios('https://asdfast.beobit.net/api/?lenght=11')
		.then(res => articleDes = res.data.text)
	await axios('https://dummyjson.com/quotes/random')
		.then(res => quote = (res.data))

	return {
		props: {
			articleDes,
			quote
		}
	}
}