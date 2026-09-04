import type { ReactNode } from 'react'

import Cadence from '../components/docs/Cadence'
import DataTable from '../components/docs/DataTable'
import Figure from '../components/docs/Figure'
import Formula from '../components/docs/Formula'
import PullQuote from '../components/docs/PullQuote'
import Where from '../components/docs/Where'
import { M } from '../components/docs/math'

import Illu02FragmentedLiquidity from '../components/illustrations/Illu02FragmentedLiquidity'
import Illu03OracleConsensus from '../components/illustrations/Illu03OracleConsensus'
import Illu04RegimeStateMachine from '../components/illustrations/Illu04RegimeStateMachine'
import Illu05ImpactCurves from '../components/illustrations/Illu05ImpactCurves'
import Illu06CapitalStack from '../components/illustrations/Illu06CapitalStack'
import Illu07BidLadder from '../components/illustrations/Illu07BidLadder'
import Illu08CapitalAuction from '../components/illustrations/Illu08CapitalAuction'
import Illu09InventoryYield from '../components/illustrations/Illu09InventoryYield'
import Illu10QuotingEngine from '../components/illustrations/Illu10QuotingEngine'
import Illu11DislocationPipeline from '../components/illustrations/Illu11DislocationPipeline'
import Illu12HedgingFramework from '../components/illustrations/Illu12HedgingFramework'
import Illu13TreasuryWaterfall from '../components/illustrations/Illu13TreasuryWaterfall'

export interface MethodologySection {
  id: string
  number: string
  title: string
  short: string
  body: ReactNode
}

export const SECTIONS: MethodologySection[] = [
  {
    id: 'market-structure',
    number: '1',
    title: 'The market structure premise',
    short: 'Market structure',
    body: (
      <>
        <p>Tokenized equities trade across fragmented liquidity surfaces:</p>

        <ul className="doc-list">
          <li>Liquidity Book venues</li>
          <li>Uniswap v4 pools</li>
          <li>Concentrated liquidity ranges</li>
          <li>Tokenized stock wrappers</li>
          <li>Cross-quoted synthetic assets</li>
        </ul>

        <p>
          All of these reference the same economic asset while maintaining independent
          liquidity.
        </p>

        <p>The consequence is persistent fragmentation:</p>

        <Formula lines={['P_1 ≠ P_2 ≠ P_3 ≠ P_fair']} />

        <p>
          Small trades routinely create deviations large enough to exceed institutional
          market-making spreads.
        </p>

        <p>
          A participant already holding inventory when those deviations occur becomes the
          counterparty of record.
        </p>

        <p>KEEL extends this observation.</p>

        <p>The protocol does not merely hold inventory.</p>

        <p>It also:</p>

        <ul className="doc-list">
          <li>acquires inventory below fair value</li>
          <li>lends inventory when idle</li>
          <li>provides standing liquidity</li>
          <li>arbitrages dislocations</li>
          <li>hedges inventory risk</li>
        </ul>

        <p>The design reduces to one sentence:</p>

        <PullQuote>Own the balance sheet before the market needs it.</PullQuote>

        <Figure number={2} caption="Fragmented liquidity ecosystem">
          <Illu02FragmentedLiquidity />
        </Figure>
      </>
    ),
  },
  {
    id: 'reference-pricing',
    number: '2',
    title: 'Reference pricing',
    short: 'Reference pricing',
    body: (
      <>
        <Cadence lines={['No single venue is trusted.', 'No single oracle is trusted.']} />

        <p>
          For instrument <M>i</M>:
        </p>

        <Where
          items={[
            ['P_print(i)', 'primary market reference'],
            ['P_twap(i)', 'deep-liquidity TWAP'],
            ['P_oracle(i)', 'decentralized oracle consensus'],
          ]}
        />

        <p>KEEL defines:</p>

        <h3 className="doc-subhead">Buy Reference</h3>
        <Formula lines={['P_buy = min(P_print, P_twap, P_oracle) · (1 − h)']} />

        <h3 className="doc-subhead">Sell Reference</h3>
        <Formula lines={['P_sell = max(P_print, P_twap, P_oracle) · (1 + h)']} />

        <Where title="where" items={[['h', 'wrapper risk haircut']]} />

        <p>The protocol buys only below the lowest honest estimate.</p>

        <p>The protocol sells only above the highest honest estimate.</p>

        <p>This asymmetry intentionally sacrifices volume in exchange for correctness.</p>

        <h3 className="doc-subhead">Oracle disagreement</h3>

        <p>Define:</p>

        <Formula lines={['Ω = max(P_sources) − min(P_sources)']} />

        <p>If:</p>

        <Formula lines={['Ω > η']} />

        <p>the instrument enters HALT MODE.</p>

        <ul className="doc-list">
          <li>No inventory growth is permitted.</li>
          <li>No dislocation trades are permitted.</li>
          <li>Only risk-reducing actions remain available.</li>
        </ul>

        <PullQuote>
          The protocol would rather miss profit than trade uncertainty.
        </PullQuote>

        <Figure number={3} caption="Oracle consensus layer">
          <Illu03OracleConsensus />
        </Figure>
      </>
    ),
  },
  {
    id: 'market-regime',
    number: '3',
    title: 'Market regime classification',
    short: 'Regime classification',
    body: (
      <>
        <p>Every instrument continuously exists in one of three operating states.</p>

        <DataTable
          head={['Regime', 'Description']}
          rows={[
            ['OPEN', 'Primary market session active'],
            ['CLOSED', 'After-hours or weekend'],
            ['HALT', 'Event risk or oracle disagreement'],
          ]}
          mono={[0]}
        />

        <h3 className="doc-subhead">OPEN</h3>
        <ul className="doc-list">
          <li>Tight spreads</li>
          <li>Two-sided quoting</li>
          <li>Active inventory acquisition</li>
          <li>Active dislocation harvesting</li>
        </ul>

        <h3 className="doc-subhead">CLOSED</h3>
        <ul className="doc-list">
          <li>Position sizes reduced</li>
          <li>Thresholds widened</li>
          <li>Cross-venue basis trading only</li>
        </ul>

        <h3 className="doc-subhead">HALT</h3>
        <p>Triggered by:</p>
        <ul className="doc-list">
          <li>earnings releases</li>
          <li>exchange halts</li>
          <li>oracle disagreement</li>
          <li>wrapper events</li>
          <li>governance intervention</li>
        </ul>

        <p>Only inventory reduction and hedging are allowed.</p>

        <p>No directional risk may be created.</p>

        <Figure number={4} caption="Regime state machine">
          <Illu04RegimeStateMachine />
        </Figure>
      </>
    ),
  },
  {
    id: 'liquidity-survey',
    number: '4',
    title: 'Liquidity survey and eligibility',
    short: 'Liquidity survey',
    body: (
      <>
        <p>Every instrument is evaluated daily.</p>

        <p>Impact function:</p>

        <Formula lines={['I(Q) = P_eff(Q) / P_ref − 1']} />

        <p>for:</p>

        <Formula lines={['Q ∈ {100, 1000, 10000 USD}']} />

        <p>Classification:</p>

        <DataTable
          head={['Class', 'Condition']}
          rows={[
            ['Deep', 'I(10k) ≈ 0'],
            ['Tradeable', 'Moderate impact'],
            ['Thin', 'Significant impact'],
            ['Extreme', 'Structural risk'],
          ]}
        />

        <p>The protocol targets:</p>

        <p>
          <strong>Tradeable + Thin</strong>
        </p>

        <p>Deep markets offer little edge.</p>

        <p>Extreme markets create excessive risk.</p>

        <Cadence lines={['Liquidity is treated as a state.', 'Not a property.']} />

        <Figure number={5} caption="Impact function curves">
          <Illu05ImpactCurves />
        </Figure>
      </>
    ),
  },
  {
    id: 'capital-architecture',
    number: '5',
    title: 'Capital architecture',
    short: 'Capital architecture',
    body: (
      <>
        <p>Capital is separated into independent layers.</p>

        <DataTable
          head={['Layer', 'Function']}
          rows={[
            ['Senior Vault', 'Depositor capital'],
            ['Surplus Reserve', 'Protocol equity'],
            ['Insurance Fund', 'First-loss protection'],
            ['Junior Layer', 'Governance and residual risk'],
          ]}
        />

        <Cadence lines={['Losses flow upward.', 'Profits flow downward.']} />

        <p>No trading strategy depends on token speculation for survival.</p>

        <Figure number={6} caption="Capital stack">
          <Illu06CapitalStack />
        </Figure>
      </>
    ),
  },
  {
    id: 'inventory-acquisition',
    number: '6',
    title: 'Competitive inventory acquisition',
    short: 'Inventory acquisition',
    body: (
      <>
        <p>Traditional systems purchase inventory at prevailing market prices.</p>

        <p>KEEL first attempts acquisition through passive bids.</p>

        <p>
          For instrument <M>i</M>:
        </p>

        <Formula lines={['B_i(k) = P_buy(i) · (1 − β_k)']} />

        <Where title="where" items={[['β_k', 'bid ladder discount']]} />

        <p>Example:</p>

        <DataTable
          head={['Level', 'Discount']}
          rows={[
            ['B1', '0.5%'],
            ['B2', '1.0%'],
            ['B3', '2.0%'],
            ['B4', '3.5%'],
          ]}
          mono={[0, 1]}
        />

        <p>Inventory is acquired by absorbing natural selling pressure.</p>

        <p>Aggressive market purchases occur only when:</p>

        <Formula lines={['Inventory_i < Target_i']} />

        <p>and passive acquisition remains insufficient.</p>

        <h3 className="doc-subhead">Economic rationale</h3>

        <p>Most traders pay for immediacy.</p>

        <p>The protocol monetizes that impatience.</p>

        <p>KEEL therefore earns on entry and exit.</p>

        <p>MM earns only on exit.</p>

        <Figure number={7} caption="Passive bid ladder engine">
          <Illu07BidLadder />
        </Figure>
      </>
    ),
  },
  {
    id: 'capital-auction',
    number: '7',
    title: 'Internal capital auction',
    short: 'Capital auction',
    body: (
      <>
        <Cadence lines={['Capital is finite.', 'Opportunities are not.']} />

        <p>Each instrument receives a score:</p>

        <Formula lines={['Score_i = ExpectedEdge_i / Risk_i']} />

        <p>Capital allocation:</p>

        <Formula lines={['W_i = Score_i / Σ Score_j']} accent />

        <p>This converts deployment into an internal auction.</p>

        <p>The highest risk-adjusted opportunities receive capital first.</p>

        <Cadence lines={['Inventory allocation becomes a market.', 'Not a round robin.']} />

        <Figure number={8} caption="Internal capital market">
          <Illu08CapitalAuction />
        </Figure>
      </>
    ),
  },
  {
    id: 'inventory-utilization',
    number: '8',
    title: 'Inventory utilization',
    short: 'Inventory utilization',
    body: (
      <>
        <p>Inventory is treated as productive capital.</p>

        <p>When not required for:</p>

        <ul className="doc-list">
          <li>liquidity provision</li>
          <li>dislocation harvesting</li>
          <li>hedging</li>
        </ul>

        <p>inventory may be deployed into approved utilization venues.</p>

        <p>Examples:</p>

        <ul className="doc-list">
          <li>securities lending</li>
          <li>collateralized borrowing</li>
          <li>inventory leasing</li>
          <li>financing markets</li>
        </ul>

        <p>Inventory yield:</p>

        <Formula lines={['Y_i = BorrowRate_i × Inventory_i']} />

        <p>
          The balance sheet therefore remains productive even during low-volatility periods.
        </p>

        <Figure number={9} caption="Inventory yield layer">
          <Illu09InventoryYield />
        </Figure>
      </>
    ),
  },
  {
    id: 'liquidity-provision',
    number: '9',
    title: 'Two-sided liquidity provision',
    short: 'Liquidity provision',
    body: (
      <>
        <p>The protocol continuously quotes both sides.</p>

        <p>Bid:</p>
        <Formula lines={['Bid_i = P_ref − λσ_i']} />

        <p>Ask:</p>
        <Formula lines={['Ask_i = P_ref + λσ_i']} />

        <Where
          title="where"
          items={[
            ['σ_i', 'realized volatility'],
            ['λ', 'spread coefficient'],
          ]}
        />

        <p>Inventory imbalance dynamically skews both quotes.</p>

        <PullQuote>
          This revenue stream exists even if dislocations disappear entirely.
        </PullQuote>

        <Figure number={10} caption="Dynamic quoting engine">
          <Illu10QuotingEngine />
        </Figure>
      </>
    ),
  },
  {
    id: 'dislocation-qualification',
    number: '10',
    title: 'Dislocation qualification',
    short: 'Dislocation qualification',
    body: (
      <>
        <Cadence lines={['Displayed price is not evidence.', 'Execution is evidence.']} />

        <p>Deviation:</p>
        <Formula lines={['δ_p = (P_pool − P_ref) / P_ref']} />

        <p>Fillability:</p>
        <Formula lines={['Φ_p = V_out(q₀)']} />

        <p>Liquidity score:</p>
        <Formula lines={['L_p']} />

        <p>Effective dislocation:</p>
        <Formula lines={['δ_eff = δ_p × Φ_p × L_p']} accent />

        <p>A pool qualifies iff:</p>
        <Formula lines={['δ_eff ≥ δ*']} />

        <p>
          Dead pools, fake quotes, and structural artifacts are rejected before execution.
        </p>

        <Figure number={11} caption="Dislocation qualification pipeline">
          <Illu11DislocationPipeline />
        </Figure>
      </>
    ),
  },
  {
    id: 'execution-logic',
    number: '11',
    title: 'Execution and tranche logic',
    short: 'Execution logic',
    body: (
      <>
        <p>Maximum executable size:</p>
        <Formula lines={['S*']} />

        <p>subject to:</p>
        <Formula lines={['P_eff ≥ RequiredReturn']} />

        <p>Execution occurs in tranches.</p>

        <p>Each tranche:</p>

        <ul className="doc-list">
          <li>respects self-impact limits</li>
          <li>respects liquidity constraints</li>
          <li>re-evaluates the market before continuation</li>
        </ul>

        <p>Persistent opportunities are harvested gradually.</p>

        <p>Not violently.</p>
      </>
    ),
  },
  {
    id: 'portfolio-hedging',
    number: '12',
    title: 'Portfolio hedging',
    short: 'Portfolio hedging',
    body: (
      <>
        <Cadence lines={['Inventory is not alpha.', 'Inventory is risk.']} />

        <p>Net portfolio delta:</p>
        <Formula lines={['Δ_port = ΣΔ_i']} />

        <p>Target:</p>
        <Formula lines={['Δ_port ≈ 0']} />

        <p>Hedges may include:</p>

        <ul className="doc-list">
          <li>index perps</li>
          <li>sector baskets</li>
          <li>synthetic equity exposure</li>
          <li>collateralized borrowing</li>
        </ul>

        <p>Residual risk limits are enforced at contract level.</p>

        <Figure number={12} caption="Hedging framework">
          <Illu12HedgingFramework />
        </Figure>
      </>
    ),
  },
  {
    id: 'treasury',
    number: '13',
    title: 'Treasury and surplus management',
    short: 'Treasury & surplus',
    body: (
      <>
        <p>Unlike distribution-first systems:</p>

        <p>profit is retained before distribution.</p>

        <DataTable
          head={['Destination', 'Allocation']}
          rows={[
            ['Surplus Reserve', '40%'],
            ['Reinvestment', '30%'],
            ['Insurance Fund', '20%'],
            ['Governance Distribution', '10%'],
          ]}
          mono={[1]}
        />

        <p>Reserve target:</p>
        <Formula lines={['Reserve ≥ 20% of AUM']} />

        <p>Only profits above the reserve threshold become distributable.</p>

        <PullQuote>The protocol prioritizes compounding over extraction.</PullQuote>

        <Figure number={13} caption="Treasury waterfall">
          <Illu13TreasuryWaterfall />
        </Figure>
      </>
    ),
  },
  {
    id: 'security-invariants',
    number: '14',
    title: 'Security invariants',
    short: 'Security invariants',
    body: (
      <>
        <DataTable
          head={['Invariant', 'Enforcement']}
          rows={[
            ['Single custody address', 'Fund contract'],
            ['Venue allowlist', 'Contract enforced'],
            ['Oracle disagreement halt', 'Automatic'],
            ['Exposure limits', 'Contract enforced'],
            ['Distribution limits', 'Contract enforced'],
            ['Keeper rotation', 'Single transaction'],
            ['Emergency pause', 'Timelocked'],
            ['Withdrawal safety', 'Always available'],
          ]}
        />

        <p>The protocol assumes:</p>

        <ul className="doc-list">
          <li>oracles fail</li>
          <li>venues fail</li>
          <li>keepers fail</li>
          <li>governance fails</li>
        </ul>

        <p>and remains solvent under those assumptions.</p>
      </>
    ),
  },
  {
    id: 'operating-parameters',
    number: '15',
    title: 'Operating parameters',
    short: 'Operating parameters',
    body: (
      <>
        <DataTable
          head={['Symbol', 'Meaning']}
          rows={[
            ['δ*', 'Minimum effective dislocation'],
            ['q₀', 'Fillability probe'],
            ['h', 'Wrapper haircut'],
            ['η', 'Oracle disagreement threshold'],
            ['τ', 'Tranche fraction'],
            ['Δt', 'Cooldown interval'],
            ['λ', 'Volatility coefficient'],
            ['Cap_i', 'Exposure cap'],
            ['D_max', 'Maximum portfolio delta'],
            ['U_max', 'Maximum inventory utilization'],
          ]}
          mono={[0]}
        />

        <Cadence lines={['Parameters are operating policy.', 'Not physical constants.']} />

        <p>
          The protocol publishes them because predictability is part of liquidity.
        </p>
      </>
    ),
  },
  {
    id: 'closing-thesis',
    number: '16',
    title: 'Closing thesis',
    short: 'Closing thesis',
    body: (
      <>
        <p>First-generation tokenized-equity systems monetized mistakes.</p>

        <p>Second-generation systems monetized liquidity.</p>

        <p>KEEL is designed to monetize balance-sheet efficiency.</p>

        <p>
          It exists to become the standing buyer, lender, liquidity provider, arbitrageur,
          and inventory manager of tokenized-equity markets.
        </p>

        <p>It does not depend on volatility.</p>

        <p>It does not depend on token speculation.</p>

        <p>It does not depend on token volume.</p>

        <p>It depends on one thing only:</p>

        <PullQuote>the continued existence of fragmented liquidity.</PullQuote>

        <p>
          As long as liquidity remains fragmented, the protocol remains economically useful.
        </p>
      </>
    ),
  },
]
