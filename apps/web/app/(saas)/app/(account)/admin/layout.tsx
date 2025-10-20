import { config } from "@repo/config";
import { getSession } from "@saas/auth/lib/server";
import { SettingsMenu } from "@saas/settings/components/SettingsMenu";
import { PageHeader } from "@saas/shared/components/PageHeader";
import { SidebarContentLayout } from "@saas/shared/components/SidebarContentLayout";
import { Logo } from "@shared/components/Logo";
import {
	BarChart3,
	Building2Icon,
	FolderTree,
	Package,
	ShoppingCart,
	UsersIcon,
	Warehouse,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {
	const t = await getTranslations();
	const session = await getSession();

	if (!session) {
		return redirect("/auth/login");
	}

	if (session.user?.role !== "admin") {
		redirect("/app");
	}

	return (
		<>
			<PageHeader
				title={t("admin.title")}
				subtitle={t("admin.description")}
			/>
			<SidebarContentLayout
				sidebar={
					<SettingsMenu
						menuItems={[
							{
								avatar: (
									<Logo
										className="size-8"
										withLabel={false}
									/>
								),
								title: t("admin.title"),
								items: [
									{
										title: "Dashboard",
										href: "/app/admin/dashboard",
										icon: (
											<BarChart3 className="size-4 opacity-50" />
										),
									},
									{
										title: t("admin.menu.users"),
										href: "/app/admin/users",
										icon: (
											<UsersIcon className="size-4 opacity-50" />
										),
									},
									...(config.organizations.enable
										? [
												{
													title: t(
														"admin.menu.organizations",
													),
													href: "/app/admin/organizations",
													icon: (
														<Building2Icon className="size-4 opacity-50" />
													),
												},
											]
										: []),
									{
										title: "Products",
										href: "/app/admin/products",
										icon: (
											<Package className="size-4 opacity-50" />
										),
									},
									{
										title: "Inventory",
										href: "/app/admin/inventory",
										icon: (
											<Warehouse className="size-4 opacity-50" />
										),
									},
									{
										title: "Orders",
										href: "/app/admin/orders",
										icon: (
											<ShoppingCart className="size-4 opacity-50" />
										),
									},
									{
										title: "Categories",
										href: "/app/admin/categories",
										icon: (
											<FolderTree className="size-4 opacity-50" />
										),
									},
								],
							},
						]}
					/>
				}
			>
				{children}
			</SidebarContentLayout>
		</>
	);
}
