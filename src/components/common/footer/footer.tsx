import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div className="footer">
                <p><Link href="/">home</Link></p>
                <p><Link href="/about">about</Link></p>
                <p>A big thanks to <Link href="http://giphy.com/">giphy.com</Link> for letting us use their API!</p>
            </div>
        </>
    )
}
