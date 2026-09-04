import type { ReactNode } from 'react'

import Cadence from '../components/docs/Cadence'
import DataTable from '../components/docs/DataTable'
import Figure from '../components/docs/Figure'
import Formula from '../components/docs/Formula'
import PullQuote from '../components/docs/PullQuote'

import Illu06CapitalStack from '../components/illustrations/Illu06CapitalStack'
import Illu13TreasuryWaterfall from '../components/illustrations/Illu13TreasuryWaterfall'

export interface DistributionSection {
  id: string
  number: string
  title: string
  short: string
  body: ReactNode
}

export const DISTRIBUTION_SECTIONS: DistributionSection[] = [
  {
    id: 'compounding-first',
    number: '1',
    title: 'Compounding before extraction',
    short: 'Compounding first',
    body: (
      <>
        <p>Unlike distribution-first systems:</p>

        <p>profit is retained before distribution.</p>

        <p>
          KEEL treats realized profit as balance-sheet fuel — not as a dividend to be
          maximized. Spread capture, dislocation harvesting, and inventory yield all
          flow into a treasury waterfall before any token holder or governance participant
          receives a distribution.
        </p>

        <PullQuote>The protocol prioritizes compounding over extraction.</PullQuote>

        <p>
          This is not a temporary bootstrap policy. It is the default operating posture of
          the protocol: equity is built first, protection is funded second, and external
          distribution is the last allocation — never the first.
        </p>
      </>
    ),
  },
  {
    id: 'profit-waterfall',
    number: '2',
    title: 'The profit waterfall',
    short: 'Profit waterfall',
    body: (
      <>
        <p>Every realized profit is split across four destinations:</p>

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

        <h3 className="doc-subhead">Surplus Reserve — 40%</h3>
        <p>
          The primary sink for realized profit. Surplus Reserve is protocol equity — the
          buffer that absorbs volatility, funds expansion, and compounds the balance
          sheet without diluting depositor claims.
        </p>

        <h3 className="doc-subhead">Reinvestment — 30%</h3>
        <p>
          Deployed back into inventory acquisition, quoting capital, and dislocation
          harvesting capacity. Reinvestment ensures the protocol can scale with
          opportunity rather than extract from it.
        </p>

        <h3 className="doc-subhead">Insurance Fund — 20%</h3>
        <p>
          First-loss protection for the senior vault. The Insurance Fund absorbs losses
          before depositor capital is touched, and is replenished continuously from
          profit rather than reactively after a drawdown.
        </p>

        <h3 className="doc-subhead">Governance Distribution — 10%</h3>
        <p>
          The only allocation that leaves the protocol balance sheet. Governance
          Distribution is paid only after the reserve gate is satisfied — never from
          gross profit, and never at the expense of solvency.
        </p>

        <Figure number={1} caption="Treasury waterfall">
          <Illu13TreasuryWaterfall />
        </Figure>
      </>
    ),
  },
  {
    id: 'reserve-gate',
    number: '3',
    title: 'The reserve gate',
    short: 'Reserve gate',
    body: (
      <>
        <p>Not all profit is distributable. A reserve target must be met first:</p>

        <Formula lines={['Reserve ≥ 20% of AUM']} accent />

        <p>Only profits above the reserve threshold become distributable.</p>

        <p>
          The gate works as a hard constraint, not a guideline. When surplus reserve falls
          below 20% of assets under management, the Governance Distribution allocation is
          suspended entirely — regardless of recent profitability or governance pressure.
        </p>

        <Cadence
          lines={[
            'Below the gate: zero external distribution.',
            'Above the gate: distributable surplus only.',
          ]}
        />

        <p>
          This ensures the protocol never distributes its way into undercapitalization.
          Predictability of distribution policy is itself a form of liquidity — depositors
          and counterparties can model the protocol's behavior without guessing at
          governance whim.
        </p>
      </>
    ),
  },
  {
    id: 'capital-layers',
    number: '4',
    title: 'Capital layers and loss ordering',
    short: 'Capital layers',
    body: (
      <>
        <p>Distribution policy sits on top of a fixed capital architecture.</p>

        <p>Capital is separated into independent layers:</p>

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

        <p>
          When the protocol earns, surplus reserve and insurance fund are replenished
          before any governance distribution is considered. When the protocol loses,
          the junior layer absorbs first, then insurance, then surplus — and only as a
          last resort does loss reach the senior vault.
        </p>

        <p>No trading strategy depends on token speculation for survival.</p>

        <Figure number={2} caption="Capital stack and loss waterfall">
          <Illu06CapitalStack />
        </Figure>
      </>
    ),
  },
  {
    id: 'revenue-sources',
    number: '5',
    title: 'What feeds the waterfall',
    short: 'Revenue sources',
    body: (
      <>
        <p>Realized profit entering the treasury waterfall comes from four independent streams:</p>

        <ul className="doc-list">
          <li>
            <strong>Spread capture</strong> — two-sided quoting around fair value, scaled
            by realized volatility and inventory skew
          </li>
          <li>
            <strong>Dislocation harvesting</strong> — verified cross-venue arbitrage where
            effective dislocation exceeds the minimum threshold
          </li>
          <li>
            <strong>Inventory acquisition edge</strong> — passive bid ladder discounts
            captured on entry, not only on exit
          </li>
          <li>
            <strong>Inventory yield</strong> — borrow rates earned on idle inventory
            deployed to approved financing venues
          </li>
        </ul>

        <p>
          None of these streams depend on token price, token volume, or market volatility
          alone. The waterfall is designed to remain fed even in low-volatility regimes —
          which is precisely when distribution-first systems tend to hollow out their
          balance sheets.
        </p>
      </>
    ),
  },
  {
    id: 'governance-distribution',
    number: '6',
    title: 'Governance distribution mechanics',
    short: 'Governance distribution',
    body: (
      <>
        <p>The 10% Governance Distribution allocation is subject to three conditions:</p>

        <ul className="doc-list">
          <li>Surplus Reserve is at or above 20% of AUM</li>
          <li>Realized profit has cleared the reserve gate for the period</li>
          <li>Distribution limits enforced at contract level are not breached</li>
        </ul>

        <p>When all three conditions are met:</p>

        <Formula lines={['Distributable = Profit_above_gate × 10%']} />

        <p>
          When any condition fails, the full realized profit allocation for that period
          flows to Surplus Reserve, Reinvestment, and Insurance Fund — with zero
          Governance Distribution.
        </p>

        <PullQuote>
          The protocol would rather retain profit than distribute into undercapitalization.
        </PullQuote>
      </>
    ),
  },
  {
    id: 'invariants',
    number: '7',
    title: 'Contract-enforced invariants',
    short: 'Invariants',
    body: (
      <>
        <p>Distribution policy is not discretionary. It is enforced at contract level:</p>

        <DataTable
          head={['Invariant', 'Enforcement']}
          rows={[
            ['Distribution limits', 'Contract enforced'],
            ['Reserve gate', 'Automatic — distribution suspended below 20% AUM'],
            ['Waterfall allocation', 'Fixed ratios — not governance-adjustable per period'],
            ['Withdrawal safety', 'Always available'],
            ['Single custody address', 'Fund contract'],
            ['Emergency pause', 'Timelocked'],
          ]}
        />

        <p>The protocol assumes:</p>

        <ul className="doc-list">
          <li>governance fails</li>
          <li>keepers fail</li>
          <li>markets turn</li>
        </ul>

        <p>and remains solvent under those assumptions.</p>

        <Cadence lines={['Parameters are operating policy.', 'Not physical constants.']} />

        <p>
          The protocol publishes them because predictability is part of liquidity.
        </p>
      </>
    ),
  },
]
