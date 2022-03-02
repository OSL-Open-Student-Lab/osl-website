import Link from 'next/link'
import dayjs from 'dayjs'
export function Footer() {
  return (
    <footer className="py-3 bg-secondary bg-gradient text-light position-sticky top-100">
      <div className="text-center my-3">
        {/* © {dayjs().year()} Copyright:&nbsp;
        <Link href="https://klgtu.ru" passHref>
          <a className="card-link text-light">klgtu.ru</a>
        </Link> */}
      </div>
    </footer>
  )
}
