import dynamic, { LoaderComponent } from 'next/dynamic'
import InView from './InView'
import Widget from './Widget'

const enum WidgetHeight {
  XLarge = 620,
  Large = 472,
  Medium = 312,
  Small = 152,
}

function lazyLoadWidget(
  importPromise: () => LoaderComponent,
  loaderSize?: number
) {
  return dynamic(importPromise, {
    loading: () => <Widget status="loading" loaderSize={loaderSize} />,
    ssr: false,
  })
}

const KPIsWidget = lazyLoadWidget(() => import('./KpisWidget'), 80)
const BrowsersWidget = lazyLoadWidget(() => import('./BrowsersWidget'))
const TopPagesWidget = lazyLoadWidget(() => import('./TopPagesWidget'))
const TrendWidget = lazyLoadWidget(() => import('./TrendWidget'), 40)
const TopDevicesWidget = lazyLoadWidget(() => import('./TopDevicesWidget'))
const TopSourcesWidget = lazyLoadWidget(() => import('./TopSourcesWidget'))
const TopLocationsWidget = lazyLoadWidget(() => import('./TopLocationsWidget'))

export default function Widgets() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:gap-10 grid-rows-3-auto">
      <div className="col-span-2" style={{ height: WidgetHeight.XLarge }}>
        <KPIsWidget />
      </div>
      <div className="col-start-1 col-span-2 lg:col-span-1 grid grid-cols-1 gap-5 sm:gap-10 grid-rows-3-auto">
        <InView height={WidgetHeight.Small}>
          <TrendWidget />
        </InView>
        <InView height={WidgetHeight.Large}>
          <TopPagesWidget />
        </InView>
        <InView height={WidgetHeight.Large}>
          <TopLocationsWidget />
        </InView>
      </div>
      <div className="col-start-1 col-span-2 lg:col-start-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-10 grid-rows-2-auto lg:grid-rows-3-auto">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <InView height={WidgetHeight.Large}>
            <TopSourcesWidget />
          </InView>
        </div>
        <InView height={WidgetHeight.Medium}>
          <TopDevicesWidget />
        </InView>
        <InView height={WidgetHeight.Medium}>
          <BrowsersWidget />
        </InView>
      </div>
    </div>
  )
}
