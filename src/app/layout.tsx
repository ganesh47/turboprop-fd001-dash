import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Providers} from "@/app/providers";

// noinspection JSUnusedLocalSymbols
const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'TurboProp FD001 Demo',
    description: 'TurboProp FD001 Demo Dashboard',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={"dark"}>
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}