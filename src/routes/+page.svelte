<script lang="ts">
	import { refreshValidator } from '$lib';
	import type { ReportValidator } from 'libra-reports/src/reports/validators';
	import { mapHandles } from 'libra-reports/src/util';
	import { onMount } from 'svelte';

	let isReady = false;
	let rv: ReportValidator;
	onMount(async () => {
		rv = await refreshValidator();
		isReady = true;
	});
</script>

<body>
	{#if isReady}
		<table>
			<tr><b>SEATED</b></tr>
			<tr>
				<th>handle</th>
				<th>address</th>
				<th>bid</th>
				<th>active vouchers</th>
				<th>vouches given</th>
			</tr>
			{#each rv.profiles.entries() as [k, v]}
				{#if v.in_val_set}
					<tr>
						<td>{v.handle}</td>
						<td>{k.slice(2, 6)}</td>
						<td>{v.bid_value}</td>
						<td>{mapHandles(v.active_vouchers ?? [], rv)}</td>
						<td>{mapHandles(v.vouches_given?.addresses ?? [], rv)}</td>
					</tr>
				{/if}
			{/each}
			<tr><b> NOT SEATED</b></tr>
			{#each rv.profiles.entries() as [k, v]}
				{#if !v.in_val_set}
					<tr>
						<td>{v.handle}</td>
						<td>{k.slice(2, 6)}</td>
						<td>{v.bid_value}</td>
						<td>{mapHandles(v.active_vouchers ?? [], rv)}</td>
						<td>{mapHandles(v.vouches_given?.addresses ?? [], rv)}</td>
					</tr>
				{/if}
			{/each}
		</table>
	{:else}
		... living is waiting ...
	{/if}
</body>
