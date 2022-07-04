import React from 'react';

function Footer() {
	return (
		<footer className='flex flex-col items-center gap-2'>
			<p className='italic text-center text-gray-500'>Proudly published with <span
				className='font-bold text-gray-900'>Prismic</span></p>
			<img className='w-8 h-8' src="https://prismic-nextjs-blog.raulg.vercel.app/static/images/logo-prismic.svg"
				 alt="prismic logo scg"/>
		</footer>
	);
}

export default React.memo(Footer);