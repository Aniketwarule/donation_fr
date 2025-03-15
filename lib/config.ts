import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId  = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '42f27e35eec1497a072b6d5a21009bfa'

export const config = createConfig({
  chains: [mainnet, base, sepolia, optimism],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/xio_CgWy-_JQRHzbn2e3J2pw5nYesTGp'),
    [base.id]: http(),
    [sepolia.id]:  http('https://eth-sepolia.g.alchemy.com/v2/xio_CgWy-_JQRHzbn2e3J2pw5nYesTGp'),
    [optimism.id]: http(),
  },
})

// https://eth-sepolia.g.alchemy.com/v2/xio_CgWy-_JQRHzbn2e3J2pw5nYesTGp