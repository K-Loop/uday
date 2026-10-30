import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';

export default function NotFound() {
    return (
        <Page>
            <div className="py-40 text-center">
                <h1 className="font-serif text-6xl text-[#F4F0E8]">404</h1>
                <p className="mt-4 text-sm text-[#F4F0E8]/60">
                    The requested work or gallery page does not exist.
                </p>
                <Link
                    to="/"
                    className="mt-8 inline-block rounded-full border border-white/20 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[#C5A880]"
                >
                    Return to Gallery Home
                </Link>
            </div>
        </Page>
    );
}

