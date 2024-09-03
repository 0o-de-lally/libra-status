<script lang="ts">
	import Row from './row.svelte';
	import { refreshValidator } from '$lib';
	import type { ReportValidator } from 'libra-reports/src/reports/validators';
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
			<tr style="text-align: left;">
				<th>handle</th>
				<th>address</th>
				<th>bid</th>
        <th>qualification</th>
				<th>active vouchers</th>
				<th>vouches given</th>
			</tr>
			{#each rv.toSortedArray('bid_value').reverse() as v}
				{#if v.in_val_set}
					<Row {v} />
				{/if}
			{/each}
			<tr><b>BIDDING</b></tr>
			{#each rv.toSortedArray('bid_value').reverse() as v}
				{#if !v.in_val_set && v.qualification_errors.length == 0}
					<Row {v} />
				{/if}
			{/each}

      <tr><b>INELIGIBLE</b></tr>
			{#each rv.toSortedArray('bid_value').reverse() as v}
				{#if v.qualification_errors.length > 0}
					<Row {v} />
				{/if}
			{/each}
		</table>
	{:else}
		... living is waiting ...
	{/if}
</body>
