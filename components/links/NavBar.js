import Link from "next/link";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/dmhome">dmhome</Link>
                </li>
                <li>
                    <Link href="/chars">chars</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
