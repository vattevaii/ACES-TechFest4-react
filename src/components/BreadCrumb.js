import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import './BDCrumb.scss'
import routes from '../routes'
import { Breadcrumb } from 'react-bootstrap'

// import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
   const currentLocation = useLocation().pathname
   // console.log(currentLocation)
   const getRouteName = (pathname, routes) => {
      const currentRoute = routes.find((route) => route.path === pathname)
      if (currentRoute === undefined) { return { name: pathname.split('/').pop(), active: true } }
      return { name: currentRoute.name, active: false }
   }

   const getBreadcrumbs = (location) => {
      const breadcrumbs = []
      if (location !== "/") breadcrumbs.push({
         path: "/",
         name: getRouteName("/", routes).name,
         active: false,
      })
      location.split('/').reduce((prev, curr, index, array) => {
         const currentPath = `${prev}/${curr}`
         // console.log(currentPath);
         const { name, active } = getRouteName(currentPath, routes)
         // console.log(name);
         const isActive = index + 1 === array.length ? true : false;
         const result = isActive || active;
         console.log("is " + isActive + " " + active + " : " + result)
         breadcrumbs.push({
            path: currentPath,
            name: name,
            active: isActive || active,
         })
         return currentPath
      })
      return breadcrumbs
   }

   const breadcrumbs = getBreadcrumbs(currentLocation)

   return (
      <Breadcrumb bsPrefix='breadcrumb' style={{ flexDirection: 'column' }}>
         {/* {console.log(breadcrumbs)} */}
         {breadcrumbs.map(({ path, name, active }, index) => <Breadcrumb.Item
            {...(active ? { active: true } : {})}
            // active={true} disables it
            key={index}
            linkAs={Link} linkProps={{ to: path }}>
            {name}
         </Breadcrumb.Item>
         )
         }
      </Breadcrumb >
   )
}

export default React.memo(AppBreadcrumb)