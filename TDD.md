# Forest Ad Land - Technical Development Document (TDD)

## 1. System Architecture Overview
- **Phase 1 (MVP):** Web-first architecture. A responsive web application designed for fast iteration, easy testing, and cross-device compatibility without app store restrictions.
- **Phase 2 (Future Expansion):** Mobile application development (iOS/Android), likely leveraging cross-platform frameworks connected to the same centralized backend APIs.

## 2. Technology Stack
- **Frontend:** Modern web framework (e.g., React, Next.js) for a dynamic, highly responsive user interface and map rendering.
- **Backend:** **Node.js** for robust API management, business logic, and transaction processing.
- **Database & Auth:** **Supabase** (Managed PostgreSQL) for relational data (users, ad spaces, transactions) and built-in Supabase Auth for seamless user management.
- **Web3 / Blockchain Layer:** **Solana** network for high-speed, low-cost transactions. Solana Programs (smart contracts) for native token logic and digital property ownership (NFTs / compressed NFTs), coupled with `@solana/web3.js` and wallet adapters for interactions.

## 3. Core Technical Modules

### A. Identity & Access Management (IAM)
- **Hybrid Onboarding:** 
  - *Web2 Login:* Supabase Auth (Email/Password or OAuth) to lower the barrier for businesses and regular users.
  - *Web3 Login:* Solana wallet connection (e.g., Phantom, Solflare) for crypto-native users.
- **Role-Based Access Control (RBAC):** Distinct roles mapped to specific permissions (Standard User, Early Supporter, Business Account, Admin).

### B. Digital Property & Map Engine
- **Spatial Rendering:** A 2D mapping/grid engine to visualize land plots, city zones, and business areas.
- **State Synchronization:** Logic to ensure off-chain Supabase database records perfectly sync with on-chain Solana NFT ownership.
- **Property Metadata:** Handling distinct attributes for different property types (Regular plots, Premium locations, Billboards).

### C. Advertising Engine
- **Asset Storage:** Supabase Storage for secure and scalable hosting of business ad creatives (images/videos).
- **Placement & Visibility Logic:** Algorithms matching active ad campaigns to specific digital properties based on location, traffic, and ownership permissions.
- **Analytics & Tracking:** Systems to track and record ad impressions and engagement to provide ROI data to businesses.

### D. Token & Economy Gateway
- **Multi-Currency Processor:** Integration of traditional payment gateways (e.g., Stripe) alongside Solana Pay or native SPL token transfers.
- **Reward Distribution:** Automated backend processes or Solana programs that calculate and distribute ad revenues, ecosystem rewards, and upgrades to land owners.
- **Marketplace Logic:** Escrow and transfer mechanics for users buying, selling, or trading land and ad spaces safely.

## 4. High-Level Data Models (Supabase)
- **User:** `UserID`, `WalletAddress`, `Email`, `Role`, `CreatedAt`, `IsEarlySupporter`
- **Property:** `PropertyID`, `OwnerID`, `Type` (Regular, Billboard, etc.), `Coordinates`, `Status` (Available, Owned)
- **AdCampaign:** `CampaignID`, `BusinessID`, `TargetPropertyID`, `CreativeURL`, `Status`, `StartDate`, `EndDate`
- **Transaction:** `TxID`, `UserID`, `Amount`, `Currency` (Fiat/SPL Token), `Type` (Purchase, Reward, Marketplace Fee)

## 5. Security & Infrastructure Considerations
- **Smart Contract Security:** Strict auditing required for any Solana programs handling the token or land ownership.
- **Performance:** Ensuring the web map/grid interface is highly optimized to prevent lag during heavy concurrent usage.
- **Data Integrity:** Implementing robust fail-safes and rollbacks for transactions involving both Supabase Web2 databases and the Solana blockchain.
